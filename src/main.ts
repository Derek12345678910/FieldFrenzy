import { Canvas } from "./objects/canvas.js";
import { Battle } from "./objects/battle.js";
import { User } from "./objects/user.js";
import { Team } from "./objects/team.js";
import { Player } from "./objects/player.js";

import * as Attackers from "./players/children/attacker.js";
import * as Defenders from "./players/children/defender.js";
import * as Utilities from "./players/children/utility.js";
import * as Goalkeepers from "./players/children/goalie.js";

import { List } from "./datastructures/list.js";
import { Vector } from "./datastructures/vector.js";
import { Pair } from "./datastructures/pair.js";

const path: string = window.location.pathname;

const game_players: List<Player> = new List<Player>();
game_players.push(new Goalkeepers.Buffon());
game_players.push(new Goalkeepers.Courtois());
game_players.push(new Goalkeepers.Hsiung());
game_players.push(new Defenders.Alphonso());
game_players.push(new Defenders.Maldini());
game_players.push(new Defenders.VanDijk());
game_players.push(new Utilities.DeBruyne());
game_players.push(new Utilities.Derek());
game_players.push(new Utilities.Iniesta());
game_players.push(new Utilities.Modric());
game_players.push(new Attackers.Cristiano());
game_players.push(new Attackers.Haaland());
game_players.push(new Attackers.Mbappe());
game_players.push(new Attackers.Messi());
game_players.push(new Attackers.Yamal());

console.log(game_players);

let urlParams = new URLSearchParams(window.location.search);
let user1name = urlParams.get("name1");
let user2name = urlParams.get("name1");
let goalkeeper1 = urlParams.get("goalkeeper1");
let goalkeeper2 = urlParams.get("goalkeeper2");
let user1player1 = urlParams.get("1player1"); 
let user1player2 = urlParams.get("1player2"); 
let user1player3 = urlParams.get("1player3"); 
let user2player1 = urlParams.get("2player1"); 
let user2player2 = urlParams.get("2player2"); 
let user2player3 = urlParams.get("2player3"); 


let team1Players = [user1player1, user1player2, user1player3];
let team2Players = [user2player1, user2player2, user2player3];

let team11 : List<Player> = new List<Player>();
let team22 : List<Player> = new List<Player>();

for(let i=0;i<team1Players.length;i++){
    team11.push(addPlayer(team1Players[i] as string));
}

for(let k=0;k<team2Players.length;k++){
    team22.push(addPlayer(team2Players[k] as string));
}

/**
 * Returns player object based off inputted name, or Derek if name is not found
 * @param player Player name to add
 * @returns Player object
 */
function addPlayer(player: string): Player{
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

let team1 : Team = new Team(team11, addPlayer(goalkeeper1 as string));
let team2 : Team = new Team(team22, addPlayer(goalkeeper2 as string));

let user1 : User = new User(user1name as string, team1, "Red");
let user2 : User = new User(user2name as string, team2, "Blue");

console.log(user1);
console.log(user2);

let battle : Battle = new Battle(user1, user2);

let canvas : Canvas = battle.Canvas;

const canvasWidth = canvas.canvas.width;
const canvasHeight = canvas.canvas.height;

for (let i = 0; i < team1.allPlayers.size(); i++) {
  const player = team1.allPlayers.get(i) as Player;

  // Random position within canvas
  const x = Math.random() * canvasWidth;
  const y = Math.random() * canvasHeight;
  const position = new Pair(x, y);

  // Random direction vector (normalized optional)
  const angle = Math.random() * 2 * Math.PI;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const direction = new Pair(dx, dy);

  player.position = new Vector(position, direction);
}

for (let i = 0; i < team2.allPlayers.size(); i++) {
  const player = team2.allPlayers.get(i) as Player;

  // Random position within canvas
  const x = Math.random() * canvasWidth;
  const y = Math.random() * canvasHeight;
  const position = new Pair(x, y);

  // Random direction vector (normalized optional)
  const angle = Math.random() * 2 * Math.PI;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  const direction = new Pair(dx, dy);

  player.position = new Vector(position, direction);
}

// Draw both teams: red for team1's list, black for team2's list (both come from 'team')
console.log(team1);
console.log(team2)
canvas.drawPlayers(team1, "#FF0000", 10, 40);
canvas.drawPlayers(team2, "#000000", 10, 40);

// Re-draw on window resize
window.addEventListener("resize", () => {
  canvas.resizeCanvas();
  canvas.drawPlayers(team1, "#FF0000", 10, 20);
  canvas.drawPlayers(team2, "#000000", 10, 20);
});
