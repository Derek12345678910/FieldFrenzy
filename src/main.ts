import { Battle } from "./objects/battle.js";
import { User } from "./objects/user.js";
import { Team } from "./objects/team.js";
import { Player } from "./objects/player.js";
import { addPlayer } from "./utils.js";

import { List } from "./datastructures/list.js";

const path: string = window.location.pathname;

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

let team1players : List<Player> = new List<Player>();
let team2players : List<Player> = new List<Player>();

for(let i=0;i<team1Players.length;i++){
    team1players.push(addPlayer(team1Players[i] as string));
}

for(let k=0;k<team2Players.length;k++){
    team2players.push(addPlayer(team2Players[k] as string));
}

let team1 : Team = new Team(team1players, addPlayer(goalkeeper1 as string))
let team2 : Team = new Team(team2players, addPlayer(goalkeeper2 as string))


let user1 : User = new User(user1name as string, team1, "#FF0000");
let user2 : User = new User(user2name as string, team2, "#000000");

let battle : Battle = new Battle(user1, user2);