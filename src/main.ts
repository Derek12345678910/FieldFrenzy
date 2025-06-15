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

team11.push(new Attackers.Yamal());
team11.push(new Attackers.Yamal());
team11.push(new Attackers.Yamal());

team22.push(new Attackers.Yamal());
team22.push(new Attackers.Yamal());
team22.push(new Attackers.Yamal());

let team1 : Team = new Team(team11, new Attackers.Yamal());
let team2 : Team = new Team(team22, new Attackers.Yamal());

let user1 : User = new User("TEST1", team1, "#FF0000");
let user2 : User = new User("TEST2", team2, "#000000");

let battle : Battle = new Battle(user1, user2);

let canvas : Canvas = battle.Canvas;