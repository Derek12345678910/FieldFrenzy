import { Canvas } from "./canvas.js";

import { User } from "./user.js";
import { Team } from "./team.js";
import { Player } from "./player.js";
import { Mirage } from "./mirage";
import { Ball } from "./ball.js";

import { Pair } from "../datastructures/pair.js";
import { Vector } from "../datastructures/vector.js";

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

    public constructor(user1 : User, user2 : User){

        this._canvas = new Canvas("soccerField");
        this.user1 = user1;
        this.user2 = user2;

        this.userTurn = user1;

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
        console.log(this.ball.isTouchingNet(this.Canvas));
        let otheruser : User = (this.userTurn === this.user1) ? this.user2 : this.user1;
        this.Canvas.drawPlayers(this.userTurn.team, user1.colour, 10);
        this.Canvas.drawPlayers(otheruser.team, otheruser.colour, 10);
        
        window.addEventListener("resize", () => {
            console.log("A")
            this.Canvas.resizeCanvas();
            this.Canvas.drawPlayers(this.userTurn.team, user1.colour, 10);
            this.Canvas.drawPlayersReg(otheruser.team, otheruser.colour, 10);
            this.Canvas.drawBall(this.ball, this.teamPossession.colour, 10);
        });

        this.startNextRound();

    }
    /**
     * Starts the game and flips a coin determining who starts with ball
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
     * When ball is moved to a new stage check if there is a new player on it to take poessession
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
     * Starts the timer for the current turn
     */
    private startTurnTimer(): void{
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
     * Ends the current turn
     */
    private endCurrentTurn(): void{
        // clear timers and intervals
        this.clearTimers();
        this.selectedCharacter = null;
        // if it was just user1's turn, make it user2's turn and start their timer
        if(this.currentTurn === "user1"){
            this.currentTurn = "user2";
            this.userTurn = this.user2;
            this.startTurnTimer();
            this.resetField();
        }
        // if it was just user2's turn, do the transition, and display moves on canvas
        else if(this.currentTurn === "user2"){
            this.currentTurn = "transition";
            this.isTransitioning = true;
            this.resetField();
            this.drawMoves();
            // start the next round after 5 seconds
            setTimeout(()=>{
                this.startNextRound();
            }, this.transistionDuration);
        }
    }

    /**
     * Starts next round where each player chooses moves
     */ 
    private startNextRound(){
        this.currentTurn = "user1";
        this.isTransitioning = false;
        this.startTurnTimer();
    }
    /**
     * draws the countdown on the canvas
     */
    private drawCountdown(): void{
        console.log(this.timeRemaining);
    }
    /**
     * clears all the timers and intervals
     */
    private clearTimers(): void{
        if(this.turnTimer) clearTimeout(this.turnTimer);
        if(this.countdownInterval) clearInterval(this.countdownInterval);
    }
    /**
     * draws all the moves chosen by the players
     */
    private drawMoves(): void{
        console.log("Round over, drawing moves")

    }

    public get Canvas() : Canvas{
        return this._canvas;
    }
    
    public get actionPhase() : number{
        return this._actionPhase;
    }

    public set actionPhase(num : number){
        this._actionPhase = num
    }

    private resetField() : void{
        this.Canvas.clearCanvas();
        this.Canvas.drawBallReg(this.ball, this.teamPossession.colour, 10);
        this.Canvas.drawPlayersReg(this.user1.team, this.user1.colour, 10);
        this.Canvas.drawPlayersReg(this.user2.team, this.user2.colour, 10);
    }

    /**
     * Updates the on‑screen scoreboard with the current team names and scores.
     * Relies on four DOM elements: #homeName, #guestName, #homeScore, #guestScore
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

    /** Call this whenever user1 scores */
    public set goal1(val: number) {
        this._goal1 = val;
        this.updateScoreboard();
    }

    /** Call this whenever user2 scores */
    public set goal2(val: number) {
        this._goal2 = val;
        this.updateScoreboard();
    }
}