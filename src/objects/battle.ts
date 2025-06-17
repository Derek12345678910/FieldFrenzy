import { Canvas } from "./canvas.js";

import { User } from "./user.js";
import { Team } from "./team.js";
import { Player } from "./player.js";
import { Mirage } from "./mirage";
import { Ball } from "./ball.js";

import { Pair } from "../datastructures/pair.js";
import { Vector } from "../datastructures/vector.js";

/**
 * Represents a Battle match between two users controlling soccer teams
 * Handles game state, turn management, user input, drawing, and possession logic
 */
export class Battle {
    private _canvas : Canvas;
    
    private user1 : User;
    private user2 : User;

    private _goal1 : number = 0;
    private _goal2 : number = 0;

    private STAGETIME : number = 5 // time it takes for a stage to complete

    // stores whose turn it is
    private currentTurn: string = "user1";
    private userTurn : User;

    // timer for each users turn
    private turnTimer : ReturnType<typeof setTimeout> | null = null;
    // duration of the timer 
    private turnTimeLimit: number = 15000;
    // time remaining for the user to make their moves
    private timeRemaining: number = this.turnTimeLimit;
    // countdown to make moves
    private countdownInterval: ReturnType<typeof setInterval> | null = null;
    // if moves are being displayed
    private isTransitioning: boolean = false;
    // length of transistion
    private transistionDuration: number = 5000;

    // action phase
    // 0 --> searching for player to be clicked on
    // 1 --> wait for action to be choose, ability, shot, pass, move
    // 2 --> choose the spot of the action
    private _actionPhase : number = 0;

    // character selected by the user
    private selectedCharacter : Player | Mirage | null = null;

    private ball : Ball;

    private teamPossession : User;

    /**
     * Create a new Battle instance with two users and initialize game state
     * @param user1 - The first player participating
     * @param user2 - The second player participating
     */
    public constructor(user1 : User, user2 : User){

        this._canvas = new Canvas("soccerField");
        this.user1 = user1;
        this.user2 = user2;

        this.userTurn = user1;
        this.updateTimerPosition();

        this.ball = new Ball(
            new Pair(15,15),
            new Pair(15,15),
            "../assets/ball.png"
        )

        // add ball to players
        for(let i=0; i<user1.team.allPlayers.size(); i++){
            let pl1 : Player = user1.team.allPlayers.get(i) as Player;
            let pl2 : Player = user2.team.allPlayers.get(i) as Player;
            pl1.ball = this.ball; pl2.ball = this.ball;
        }

        // sync initial scoreboard (names and 0‑0 score)
        this.updateScoreboard();

        this._canvas.canvas.addEventListener('click', (event) => {
            if(this.isTransitioning || this.currentTurn === "transition") return;

            // check if any team is clicked on
            let teamToCheck : Team = this.userTurn.team;

            if(Player.selected === false){
                this.selectedCharacter = null;
                this.actionPhase = 0;
            }

            let rect = this._canvas.canvas.getBoundingClientRect();
            let mouseX : number = event.clientX - rect.left;
            let mouseY : number = event.clientY - rect.top;
            // if a player has not been found yet
            if(this._actionPhase === 0){
                for(let i=0; i<teamToCheck.allPlayers.size(); i++){
                    let player : Player = teamToCheck.allPlayers.get(i) as Player;
                    // check if player is allowed to move
                    if(player.canAct()){
                        // if clicked it means the user wants to edit him
                        if(player.isClicked(mouseX, mouseY)){
                            this._actionPhase++;
                            this.selectedCharacter = player;
                            this.selectedCharacter.displayOptions(this);
                        }
                        // check click on mirage
                        else if(player.mirage?.isClicked(mouseX, mouseY)){
                            this._actionPhase++;
                            if(player?.object instanceof Player){
                                this.selectedCharacter = player;
                                this.selectedCharacter.displayOptions(this);
                            }
                        }
                    }
                }
            }
            // click the new coord
            else if(this._actionPhase === 2){
                if(this.selectedCharacter !== null){
                    console.log(this.selectedCharacter)
                    if(this.selectedCharacter.object instanceof Player){
                        this.selectedCharacter.object.hideOptions();
                        if(this.selectedCharacter.object.move === "Move"){
                            this.selectedCharacter.object.calculatePath(mouseX, mouseY);
                            this.selectedCharacter.object.stage++;
                        }
                        else if(this.selectedCharacter.object.move === "Shoot"){
                            this.selectedCharacter.object.ball.calculatePath(mouseX, mouseY);
                            this.selectedCharacter.object.shotStage++;
                            this.selectedCharacter.object.canRun = true;
                            this.selectedCharacter.object.ball.stage++;
                        }
                    }
                    this.checkNewPossession();
                    let otheruser : User = (this.userTurn === this.user1) ? this.user2 : this.user1;
                    this._canvas.drawPlayers(this.userTurn.team, this.userTurn.colour, 10)
                    this._canvas.drawPlayersReg(otheruser.team, otheruser.colour, 10);
                    if(this.teamPossession === this.userTurn) this._canvas.drawBall(this.ball, this.teamPossession.colour, 10);
                    this.selectedCharacter = null;
                    this._actionPhase = 0;
                }
            }
        });
        if(this.gameStart()){
            this.Canvas.drawBall(this.ball, user1.colour, 10);
            this.teamPossession = user1;
        }
        else{
            this.Canvas.drawBall(this.ball, user2.colour, 10);
            this.teamPossession = user2;
        }
        let otheruser : User = (this.userTurn === this.user1) ? this.user2 : this.user1;
        this.Canvas.drawPlayers(this.userTurn.team, user1.colour, 10);
        this.Canvas.drawPlayers(otheruser.team, otheruser.colour, 10);
        
        window.addEventListener("resize", () => {
            this.Canvas.resizeCanvas();
            this.Canvas.drawPlayers(this.userTurn.team, user1.colour, 10);
            this.Canvas.drawPlayersReg(otheruser.team, otheruser.colour, 10);
            this.Canvas.drawBall(this.ball, this.teamPossession.colour, 10);
        });

        this.startNextRound();

    }

    /**
     * Initializes game positions and performs a coin toss to decide who starts with the ball
     * Positions goalies and players on the field
     * @returns true if user1 starts with the ball, false if user2 starts
     */
    private gameStart() : boolean{

        this.user1.team.goalie.position = new Vector(new Pair(10, this.Canvas.height / 2), new Pair(0, 0));

        this.user2.team.goalie.position = new Vector(new Pair(this.Canvas.width - 10, this.Canvas.height / 2), new Pair(0, 0));

        // only works for team of 3
        let p1t1 : Player = this.user1.team.player.get(0) as Player
        let p2t1 : Player = this.user1.team.player.get(1) as Player
        let p3t1 : Player = this.user1.team.player.get(2) as Player
        p1t1.position = new Vector(new Pair(200, this.Canvas.height / 2), new Pair(0, 0));
        p2t1.position = new Vector(new Pair(400, this.Canvas.height / 2), new Pair(0, 0));
        p3t1.position = new Vector(new Pair(this.Canvas.width / 2 - 50, this.Canvas.height / 2), new Pair(0, 0));

        let p1t2 : Player = this.user2.team.player.get(0) as Player
        let p2t2 : Player = this.user2.team.player.get(1) as Player
        let p3t2 : Player = this.user2.team.player.get(2) as Player
        p1t2.position = new Vector(new Pair(this.Canvas.width - 200, this.Canvas.height / 2), new Pair(0, 0));
        p2t2.position = new Vector(new Pair(this.Canvas.width - 400, this.Canvas.height / 2), new Pair(0, 0));
        p3t2.position = new Vector(new Pair(this.Canvas.width / 2 + 50, this.Canvas.height / 2), new Pair(0, 0));

        // coin toss
        if(Math.random() < 0.5){
            // heads --> user 1 ball
            this.ball.position = new Vector(new Pair(this.Canvas.width / 2 - 30, this.Canvas.height / 2), new Pair(0, 0));
            this.ball.possession = p3t1;
            return true;
        }
        else {
            this.ball.position = new Vector(new Pair(this.Canvas.width / 2 + 30, this.Canvas.height / 2), new Pair(0, 0));
            this.ball.possession = p3t2;
            return false;
        }

    }

    /**
     * Checks if the ball has moved to a new stage and if any player from the current user's team
     * is touching the ball to take possession
     */
    public checkNewPossession() : void{
        if(this.ball.stage !== 2){
            for(let i=0; i<this.userTurn.team.allPlayers.size(); i++){
                let pl : Player = this.userTurn.team.allPlayers.get(i) as Player;
                if(pl.touchingBallStage()){
                    console.log(pl);
                    this.ball.possession = pl;
                }
            }
        }
    }

    /**
     * Checks if any player on the opposing team is touching the ball and can take possession
     * If so, disables ball movement and assigns possession to that player
     */
    private checkPossessionChange() : void{
        let otheruser : User = (this.userTurn === this.user1) ? this.user2 : this.user1;
        for(let i=0; i<otheruser.team.allPlayers.size(); i++){
            let pl : Player = otheruser.team.allPlayers.get(i) as Player;
            // touches ball
            if(pl.touchingBall()){
                this.ball.canMove = false;
                this.ball.possession = pl;
            }
        }
    }

    /**
    * Resets the stages of all players and the ball after a turn
    * Resets shot stages to 0 and updates current paths to the latest stage
    */
    private resetStages() : void{
        for(let i=0; i<this.user1.team.allPlayers.size(); i++){
            let p1 : Player = this.user1.team.allPlayers.get(i) as Player;
            let p2 : Player = this.user2.team.allPlayers.get(i) as Player;

            p1.shotStage = 0; p2.shotStage = 0;
            p1.curPath = p1.stage; p2.curPath = p2.stage;
        }
        this.ball.curPath = this.ball.stage;
    }

    /**
    * Starts the turn timer for the current user’s turn
    * Resets and displays the timer countdown and sets up the turn end callback
    * Also hides the "BREAK" banners during active turns
    */
    private startTurnTimer(): void{
        // hide BREAK banners
        const breakL = document.getElementById('breakLeft')  as HTMLElement;
        const breakR = document.getElementById('breakRight') as HTMLElement;
        if (breakL) breakL.style.display = 'none';
        if (breakR) breakR.style.display = 'none';
        this.updateTimerPosition();
        // Reset time
        this.timeRemaining = this.turnTimeLimit;
        // clear timers and intervals
        this.clearTimers();

        // end the turn after 15 seconds
        this.turnTimer = setTimeout(()=>{
            console.log("Switching Turn");
            this.endCurrentTurn();
        }, this.turnTimeLimit);

        // draw the countdown once every second
        this.countdownInterval = setInterval(()=>{
            this.timeRemaining -= 1000;
            this.drawCountdown();
        },1000);
        this.drawCountdown();
    }
    /**
    * Ends the current turn and switches to the next state
    * If current turn is user1, switches to user2 and restarts timer
    * If current turn is user2, performs transition, animates moves, and starts next round after delay
    * Also resets selected character and updates the field visuals accordingly
    */
    private endCurrentTurn(): void{
        // clear timers and intervals
        this.clearTimers();
        this.selectedCharacter = null;
        // if it was just user1's turn, make it user2's turn and start their timer
        if(this.currentTurn === "user1"){
            this.currentTurn = "user2";
            this.userTurn = this.user2;
            this.updateTimerPosition();
            this.startTurnTimer();
            this.resetField();
        }
        // if it was just user2's turn, do the transition, and display moves on canvas
        else if(this.currentTurn === "user2"){
            this.currentTurn = "transition";
            this.isTransitioning = true;
            this.resetField();
            this.drawMoves();
            this.resetStages();
            // start the next round after 5 seconds
            setTimeout(()=>{
                this.startNextRound();
            }, this.transistionDuration);
        }
        console.log(this.currentTurn);
    }

    /**
    * Begins a new round of play
    * Resets flags and sets current turn to user1, then starts their turn timer
    */
    private startNextRound() : void {
        this.currentTurn = "user1";
        this.userTurn = this.user1;
        this.isTransitioning = false;
        this.startTurnTimer();
    }

    /**
     * Updates the countdown timer display in the DOM
     * Shows current user’s name and the remaining seconds
     */
    private drawCountdown(): void{
        (document.getElementById("time-name")as HTMLElement).innerHTML = `${this.userTurn.name}'s Turn`; 
        (document.getElementById("time-remaining")as HTMLElement).innerHTML = String(this.timeRemaining/1000); 
    }
    
    /**
     * Clears the turn timer timeout and the countdown interval if they exist
     */
    private clearTimers(): void{
        if(this.turnTimer) clearTimeout(this.turnTimer);
        if(this.countdownInterval) clearInterval(this.countdownInterval);
    }

    /**
    * Animates and draws the moves chosen by players on both teams.
    * Also manages the visibility of timer and break banners during animation.
    */
    private drawMoves(): void{
        const timerEl  = document.getElementById('timer')  as HTMLElement;
        const breakL   = document.getElementById('breakLeft')  as HTMLElement;
        const breakR   = document.getElementById('breakRight') as HTMLElement;
        if (timerEl) timerEl.style.display = 'none';
        if (breakL) breakL.style.display = 'block';
        if (breakR) breakR.style.display = 'block';
        for(let i=0; i<this.user1.team.allPlayers.size(); i++){
            let pl1 : Player = this.user1.team.allPlayers.get(i) as Player;
            let pl2 : Player = this.user2.team.allPlayers.get(i) as Player;

            this.Canvas.animateMovement(pl1.position.position, pl1.destinations.get(0) as Pair<number>, pl1, 22, this.user1.colour, 1000);
            this.Canvas.animateMovement(pl2.position.position, pl2.destinations.get(0) as Pair<number>, pl2, 22, this.user2.colour, 1000);
        }
    }

    /**
     * Getter for the Canvas instance used in the battle
     * @returns The Canvas object used to draw the game
     */
    public get Canvas() : Canvas{
        return this._canvas;
    }

    /**
     * Getter for the current action phase
     * @returns The current action phase as a number
     */
    public get actionPhase() : number{
        return this._actionPhase;
    }

    /**
     * Setter for the current action phase
     * @param num - The new action phase to set
     */
    public set actionPhase(num : number){
        this._actionPhase = num
    }

    /**
     * Clears the canvas and redraws the ball and both teams in their current positions
     */
    private resetField() : void{
        this.Canvas.clearCanvas();
        this.Canvas.drawBallReg(this.ball, this.teamPossession.colour, 10);
        this.Canvas.drawPlayersReg(this.user1.team, this.user1.colour, 10);
        this.Canvas.drawPlayersReg(this.user2.team, this.user2.colour, 10);
    }

    /**
     * Updates the scoreboard UI elements with the current user names and goal counts
     * Assumes presence of DOM elements with IDs: homeName, guestName, homeScore, guestScore
     */
    private updateScoreboard(): void {
        const homeNameEl = document.getElementById('homeName');
        const guestNameEl = document.getElementById('guestName');
        const homeScoreEl = document.getElementById('homeScore');
        const guestScoreEl = document.getElementById('guestScore');

        if (homeNameEl) homeNameEl.textContent = this.user1.name;
        if (guestNameEl) guestNameEl.textContent = this.user2.name;
        if (homeScoreEl) homeScoreEl.textContent = String(this._goal1);
        if (guestScoreEl)guestScoreEl.textContent = String(this._goal2);
    }

    /**
     * Positions the timer UI element either on the left or right side depending on which user's turn it is
     * Also ensures the timer element is visible
     */
    private updateTimerPosition(): void {
        const timerEl = document.getElementById('timer') as HTMLElement;
        if (!timerEl) return;

        timerEl.style.display = 'block';     // ensure visible
        timerEl.classList.remove('left', 'right');
        if (this.userTurn === this.user1) {
            timerEl.classList.add('left');
        } else {
            timerEl.classList.add('right');
        }
    }

    /**
     * Sets the score for user1 and updates the scoreboard display
     */
    public set goal1(val: number) {
        this._goal1 = val;
        this.updateScoreboard();
    }

    /**
     * Sets the score for user2 and updates the scoreboard display
     */
    public set goal2(val: number) {
        this._goal2 = val;
        this.updateScoreboard();
    }

}