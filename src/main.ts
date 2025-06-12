import { Canvas } from "./objects/canvas.js";
import { Battle } from "./objects/battle.js";
import { User } from "./objects/user.js";
import { Team } from "./objects/team.js";
import { Player } from "./objects/player.js";

import * as Attackers from "./players/children/attacker.js";

import { List } from "./datastructures/list.js";
import { Vector } from "./datastructures/vector.js";
import { Pair } from "./datastructures/pair.js";

let canvas : Canvas = new Canvas("soccerField");

let team : List<Player> = new List<Player>();
team.push(new Attackers.Yamal());
team.push(new Attackers.Yamal());
team.push(new Attackers.Yamal());

const canvasWidth = canvas.canvas.width;
const canvasHeight = canvas.canvas.height;

for (let i = 0; i < team.size(); i++) {
  const player = team.get(i) as Player;

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

for (let i = 0; i < team.size(); i++) {
  const player = team.get(i) as Player;

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

let team1 : Team = new Team(team, new Attackers.Yamal());
let team2 : Team = new Team(team, new Attackers.Yamal());

let user1 : User = new User(team1);
let user2 : User = new User(team2);

let battle : Battle = new Battle(user1, user2);

