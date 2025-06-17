import { Team } from "./team.js";
import { Player } from "./player.js";

import { Pair } from "../datastructures/pair.js";
import { Vector } from "../datastructures/vector.js";


export class User {

    private _name : string;

    private _team : Team;

    private _colour : string;

    public constructor(name : string, team : Team, colour : string){
        this._name = name;
        this._team = team;
        this._colour = colour;
    }

    public moveCharacter(selectedCharacter : Player, x : number, y : number) : void{ 
        selectedCharacter.calculatePath(x, y);
        
    }

    /**
     * Displays the options for a character when they are clicked
     * @param character the character that is clicked on
     */
    public displayOptions(character : Player) : void{
        // this should show the page and an option to either move, shoot, or use ability
    }

    public get name() : string{
        return this._name;
    }

    public get team() : Team {
        return this._team;
    }

    public get colour() : string{
        return this._colour;
    }

}