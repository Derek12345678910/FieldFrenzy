import { Canvas } from "./canvas";

import { User } from "./user.js";
import { Team } from "./team.js";
import { Player } from "./player.js";

export class Battle {
    private _canvas : Canvas;
    
    private user1 : User;
    private user2 : User;

    private goal1 : number;
    private goal2 : number;

    private STAGETIME : number = 5 // time it takes for a stage to complete

    // if true it is the first players turn
    private firstPlayerTurn : boolean = true;

    // if true it means that the user is still looking for a character to edit
    private searchingForPlayer : boolean = true;

    private selectedCharacter : Player;

    public constructor(canvas : Canvas, user1 : User, user2 : User){

        this._canvas = canvas;
        this.user1 = user1;
        this.user2 = user2;

        this._canvas.canvas.addEventListener('click', (event) => {

            let userTurn : User = (this.firstPlayerTurn) ? user1 : user2;

            const rect = this._canvas.canvas.getBoundingClientRect();
            const mouseX : number = event.clientX - rect.left;
            const mouseY : number = event.clientY - rect.top;

            // if a player has not been found yet
            if(this.searchingForPlayer){
                // check if any team is clicked on
                let teamToCheck : Team = (this.firstPlayerTurn) ? user1.team : user2.team;
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
                // make it so that there is an arrow drawn from the player to the spot
                userTurn.moveCharacter(this.selectedCharacter, mouseX, mouseY);
            }
        });

    }

}