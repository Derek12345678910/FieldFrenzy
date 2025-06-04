import { Canvas } from "./objects/canvas.js";
import { Battle } from "./objects/battle.js";
import { User } from "./objects/user.js";
import { Team } from "./objects/team.js";
import { Player } from "./objects/player.js";

import * as Attackers from "./players/children/attacker.js";

import { List } from "./datastructures/list.js";

let canvas : Canvas = new Canvas("soccerField");

let team : List<Player> = new List<Player>();
team.push(new Attackers.Yamal());
team.push(new Attackers.Yamal());
team.push(new Attackers.Yamal());


let team1 : Team = new Team(team, new Attackers.Yamal());
let team2 : Team = new Team(team, new Attackers.Yamal());

let user1 : User = new User(team1);
let user2 : User = new User(team2);

let battle : Battle = new Battle(canvas, user1, user2);

