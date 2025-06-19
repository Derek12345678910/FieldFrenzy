import { List } from "./datastructures/list.js";
import { Player } from "./objects/player.js";

import * as Attackers from "./players/children/attacker.js";
import * as Defenders from "./players/children/defender.js";
import * as Utilities from "./players/children/utility.js";
import * as Goalkeepers from "./players/children/goalie.js";

/**
 * Returns player object based off inputted name, or Derek if name is not found
 * @param player Player name to add
 * @returns Player object
 */
export function addPlayer(player: string): Player{
    if(player === "Courtois"){
        return new Goalkeepers.Courtois()
    }
    else if(player === "Buffon"){
        return new Goalkeepers.Buffon();
    }
    else if (player === "Lau") {
        return new Utilities.Derek();
    } 
    else if (player === "Hsiung") {
        return new Goalkeepers.Hsiung();
    } 
    else if (player === "Van Dijk") {
        return new Defenders.VanDijk();
    } 
    else if (player === "Davies") {
        return new Defenders.Alphonso();
    } 
    else if (player === "De Bruyne") {
        return new Utilities.DeBruyne();
    }
    else if (player === "Modric") {
        return new Utilities.Modric();
    } 
    else if (player === "Mbappe") {
        return new Attackers.Mbappe();
    } 
    else if (player === "Haaland") {
        return new Attackers.Haaland();
    } 
    else if (player === "Messi") {
        return new Attackers.Messi();
    } 
    else if (player === "Ronaldo") {
        return new Attackers.Cristiano()
    } 
    else if (player === "Yamal") {
        return new Attackers.Yamal()
    }  
    else if (player === "Maldini") {
        return new Defenders.Maldini()
    } 
    else if (player === "Iniesta") {
        return new Utilities.Iniesta()
    }
    return new Utilities.Derek();
}