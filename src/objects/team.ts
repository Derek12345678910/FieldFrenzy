import { Player } from "./player.js"

import { List } from "../datastructures/list.js"

/**
 * Team object holding all the players on a team
 */
export class Team {

    private _goalie : Player;

    private _players : List<Player>;

    private _allPlayers : List<Player>;

    private teamSize : number;

    /**
     * Create team structure
     * @param players players
     * @param goalie goalie
     */
    public constructor(players : List<Player>, goalie : Player){
        
        this._allPlayers = new List<Player>();
        for(let i=0; i<players.size(); i++){
            this._allPlayers.push(players.get(i) as Player);
        }
        this._allPlayers.push(goalie);

        this._goalie = goalie;
        this._players = players;
        this.teamSize = this._allPlayers.size();
    }

    /**
     * checks if a player is in a team
     * @param player player
     * @returns true if in team
     */
    public inTeam(player : Player) : boolean{
        for(let i=0; i<this._allPlayers.size(); i++){
            let pl : Player = this._allPlayers.get(i) as Player;
            if(player === pl){
                return true;
            }
        }
        return false;
    }

    /**
     * Resets all the players
     */
    public resetPlayers() : void{
        for(let i=0; i<this._allPlayers.size(); i++){
            let pl : Player = this._allPlayers.get(i) as Player;
            pl.fullReset();
        }
    }

    public get goalie() : Player {
        return this._goalie;
    }

    public get player() : List<Player> {
        return this._players;
    }

    public get allPlayers() : List<Player> {
        return this._allPlayers;
    }

}