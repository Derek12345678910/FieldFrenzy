import { Canvas } from "./canvas";

import { User } from "./user.js";
import { Team } from "./team.js";
import { Player } from "./player.js";

export class Battle {
    private _canvas : Canvas;
    
    private user1 : User;
    private user2 : User;

    // stores whose turn it is
    private currentTurn: string = "user1";

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

    // if true it means that the user is still looking for a character to edit
    private searchingForPlayer : boolean = true;

    // character selected by the user
    private selectedCharacter : Player | null = null;

    public constructor(canvas : Canvas, user1 : User, user2 : User){

        this._canvas = canvas;
        this.user1 = user1;
        this.user2 = user2;

        this._canvas.canvas.addEventListener('click', (event) => {
            if(this.isTransitioning || this.currentTurn === "transition") return;

            let userTurn : User = (this.currentTurn === "user1") ? user1 : user2;

            const rect = this._canvas.canvas.getBoundingClientRect();
            const mouseX : number = event.clientX - rect.left;
            const mouseY : number = event.clientY - rect.top;

            // if a player has not been found yet
            if(this.searchingForPlayer){
                // check if any team is clicked on
                let teamToCheck : Team = (this.currentTurn === "user1") ? user1.team : user2.team;
                for(let i=0; i<teamToCheck.player.size(); i++){
                    let player : Player = teamToCheck.allPlayers.get(i) as Player;
                    // if clicked it means the user wants to edit him
                    if(player.isClicked(mouseX, mouseY)){
                        this.searchingForPlayer = false;
                        this.selectedCharacter = player;
                    }
                }
            }
            else{
                if(this.selectedCharacter){
                    // make it so that there is an arrow drawn from the player to the spot
                    userTurn.moveCharacter(this.selectedCharacter, mouseX, mouseY);
                }
            }
        });
        this.startTurnTimer();
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
        this.searchingForPlayer = false;
        this.selectedCharacter = null;
        // if it was just user1's turn, make it user2's turn and start their timer
        if(this.currentTurn === "user1"){
            this.currentTurn = "user2";
            this.searchingForPlayer = true;
            this.startTurnTimer();
        }
        // if it was just user2's turn, do the transition, and display moves on canvas
        else if(this.currentTurn === "user2"){
            this.currentTurn = "transition";
            this.isTransitioning = true;
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
        this.searchingForPlayer = true;
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
}