import { Player } from "./player.js"

import { List } from "../datastructures/list.js"

export class Team {

    private _goalie : Player;

    private _players : List<Player>;

    private _allPlayers : List<Player>;

    private teamSize : number;

    public constructor(players : List<Player>, goalie : Player){
        
        this._allPlayers = players;
        this._allPlayers.push(goalie);

        this._goalie = goalie;
        this._players = players;
        this.teamSize = this._allPlayers.size();
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