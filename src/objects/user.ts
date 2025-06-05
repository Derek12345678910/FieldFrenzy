import { Team } from "./team.js";
import { Player } from "./player.js";

import { Pair } from "../datastructures/pair.js";
import { Vector } from "../datastructures/vector.js";

export class User {

    private _team : Team;

    public constructor(team : Team){
        this._team = team;
    }

    public moveCharacter(selectedCharacter : Player, x : number, y : number) : void{ 
        selectedCharacter.calculateNewVector(x, y);
        
    }

    /**
     * Displays the options for a character when they are clicked
     * @param character the character that is clicked on
     */
    public displayOptions(character : Player) : void{
        // this should show the page and an option to either move, shoot, or use ability
    }

    public get team() : Team {
        return this._team;
    }

}