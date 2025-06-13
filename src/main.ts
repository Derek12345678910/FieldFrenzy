import { Canvas } from "./objects/canvas.js";
import { Battle } from "./objects/battle.js";
import { User } from "./objects/user.js";
import { Team } from "./objects/team.js";
import { Player } from "./objects/player.js";

import * as Attackers from "./players/children/attacker.js";

import { List } from "./datastructures/list.js";
import { Vector } from "./datastructures/vector.js";
import { Pair } from "./datastructures/pair.js";

let team11 : List<Player> = new List<Player>();
let team22 : List<Player> = new List<Player>();

let team1 : Team = new Team(team11, new Attackers.Yamal());
let team2 : Team = new Team(team22, new Attackers.Yamal());

let user1 : User = new User(team1, "#FF0000");
let user2 : User = new User(team2, "#000000");

let battle : Battle = new Battle(user1, user2);

let canvas : Canvas = battle.Canvas;

team11.push(new Attackers.Yamal());
team11.push(new Attackers.Yamal());
team11.push(new Attackers.Yamal());

team22.push(new Attackers.Yamal());
team22.push(new Attackers.Yamal());
team22.push(new Attackers.Yamal());

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
canvas.drawPlayers(team1, user1.colour, 10);
canvas.drawPlayers(team2, user2.colour, 10);

// Re-draw on window resize
window.addEventListener("resize", () => {
  canvas.resizeCanvas();
  canvas.drawPlayers(team1, user1.colour, 10);
  canvas.drawPlayers(team2, user2.colour, 10);
});
