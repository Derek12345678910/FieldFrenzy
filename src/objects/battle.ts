import { Canvas } from "./canvas";

import { User } from "./user.js";
import { Team } from "./team.js";
import { Player } from "./player.js";

export class Battle {
    private _canvas : Canvas;
    
    private user1 : User;
    private user2 : User;

    // if true it is the first players turn
    private firstPlayerTurn : boolean = true;

    // if true it means that the user is still looking for a character to edit
    private searchingForPlayer : boolean = true;

    public constructor(canvas : Canvas, user1 : User, user2 : User){

        this._canvas = canvas;
        this.user1 = user1;
        this.user2 = user2;

        this._canvas.canvas.addEventListener('click', (event) => {
            const rect = this._canvas.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            console.log(user1);
            console.log(user2)

            // if a player has not been found yet
            if(this.searchingForPlayer){
                // check if any team is clicked on
                let teamToCheck : Team = (this.firstPlayerTurn) ? user1.team : user2.team;
                for(let i=0; i<teamToCheck.player.size(); i++){
                    let player : Player = teamToCheck.allPlayers.get(i) as Player;
                    // if clicked it means the user wants to edit him
                    if(player.isClicked(mouseX, mouseY)){
                        this.searchingForPlayer = false;
                    }
                }
            }
            else{
                // make it so that there is an arrow drawn from the player to the spot
            }
        });

    }
}