import { List } from "./datastructures/list.js";
import { Player } from "./objects/player.js";

import * as Attackers from "./players/children/attacker.js";
import * as Defenders from "./players/children/defender.js";
import * as Utilities from "./players/children/utility.js";
import * as Goalkeepers from "./players/children/goalie.js";

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

function getNames(data: List<Player>): List<string>{
    let player_names: List<string> = new List<string>
    for(let i=0;i<game_players.getData().length;i++){
        player_names.push(game_players.getData()[i].name);
    }
    console.log(player_names);
    return player_names;
}

let player_list: List<string> = new List<string>();
/*
player_list.push("Thibaut Courtois")
player_list.push("Gianluigi Buffon")
player_list.push("Derek Lau")
player_list.push("Jeremy Hsiung")
player_list.push("Virgil Van Dijk")
player_list.push("Alphonso Davies")
player_list.push("Kevin De Bruyne")
player_list.push("Luka Modric");
player_list.push("Kylian Mbappe");
player_list.push("Erling Haaland");
player_list.push("Lionel Messi");
player_list.push("Cristiano Ronaldo");
player_list.push("Lamine Yamal");
player_list.push("Paolo Maldini");
player_list.push("Andres Iniesta");
*/

// battle button
const BATTLEBUTTON: HTMLButtonElement = document.getElementById("battle-button") as HTMLButtonElement;
// view players button
const VIEWPLAYERSBUTTON: HTMLButtonElement = document.getElementById("view-players-button") as HTMLButtonElement;
// filter input
const FILTERINPUT: HTMLSelectElement = document.getElementById("filter-type") as HTMLSelectElement;

// add click listener to start battle button
BATTLEBUTTON.addEventListener("click",()=>{
    hideStartPage();
    displayUserOptions("battle");
});

// add click listener to view players button
VIEWPLAYERSBUTTON.addEventListener("click", ()=>{
    hideStartPage();
    displayUserOptions("players");
});

// click listener for the filter button, that filters all players
(document.getElementById("filter-button") as HTMLButtonElement).addEventListener("click", filter);
// click listener that for the start game button, that starts the game
(document.getElementById("game-start-button")as HTMLButtonElement).addEventListener("click", startGame)

/**
 * Hides all elements from the starting page
 */
function hideStartPage(): void{
    BATTLEBUTTON.hidden = true;
    VIEWPLAYERSBUTTON.hidden = true;
    (document.getElementById("title") as HTMLElement).hidden = true;
}

const SEARCHBAR = document.getElementById("search-bar") as HTMLInputElement;
const SEARCHBUTTON = document.getElementById("search-button") as HTMLButtonElement;
const DISPLAY = document.getElementById("players") as HTMLParagraphElement;


function filter(): void{
    
    let search = FILTERINPUT.value;
    console.log(search);
    let indexes: List<number> = new List<number>;
    if(search === "goalkeeper"){
        for(let i=0;i<game_players.getData().length;i++){
            if(game_players.getData()[i].field_position === "Goalkeeper"){
                indexes.push(i);
            }
        }
    }
    else if(search === "defender"){
            for(let i=0;i<game_players.getData().length;i++){
            if(game_players.getData()[i].field_position === "Defender"){
                indexes.push(i);
            }
        }
    }
    else if(search === "midfielder"){
            for(let i=0;i<game_players.getData().length;i++){
            if(game_players.getData()[i].field_position === "Midfielder"){
                indexes.push(i);
            }
        }
    }
    else if(search === "attacker"){
            for(let i=0;i<game_players.getData().length;i++){
            if(game_players.getData()[i].field_position === "Attacker"){
                indexes.push(i);
            }
        }
    }
    else{
        displayFiltered();
    }
    displayFiltered(indexes.getData());
}

function displayFiltered(indexes?: number[]): void{
    let html: string = ``
    if(!indexes){
        indexes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
    }
    for(let i=0;i<indexes.length;i++){
        html+=`
        <div class="player-container">
            <p class="player-name">${game_players.unsortedData[indexes[i]].name}</p>
            <img class="player-image" src='${game_players.unsortedData[indexes[i]].image.src}'> 
            <p class="player-position">Position: ${game_players.unsortedData[indexes[i]].field_position}</p>
            <p class="player-pace">Pace: ${game_players.unsortedData[indexes[i]].speed}</p>
            <p class="player-power">Kick: ${game_players.unsortedData[indexes[i]].power}</p>
            <button type="button" id="team1-button" class="add-player-button">Add to team 1</button>
            <button type="button" id="team2-button" class="add-player-button">Add to team 2</button>
        </div>
        \n`
    }
    console.log(html)
    DISPLAY.innerHTML = html;
        document.querySelectorAll('.add-player-button').forEach((button) =>{
        button.addEventListener("click", () =>{
            rosterPlayer("Yamal",button.id)
        })
    })
}




function rosterPlayer(player: string, team: string): void{
    if(team === "team1-button"){
        console.log("team1")
    }
    else[
        console.log("team2")
    ]
}

function displayUserOptions(page: string): void{
    if(page === "battle"){
        (document.getElementById("battle-options")as HTMLElement).style.display = "flex";
        (document.getElementById("player-display")as HTMLElement).style.display = "none"
    }
    else if(page === "players"){
        console.log("Display players");
        (document.getElementById("battle-options")as HTMLElement).style.display = "none";
        (document.getElementById("player-display")as HTMLElement).style.display = "block";
        displayFiltered();
    }
}

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

function startGame(){
    let user1name: string = (document.getElementById("user1-name")as HTMLInputElement).value;
    let user2name: string = (document.getElementById("user2-name")as HTMLInputElement).value;
    let user1Goalkeeper: string = (document.getElementById("1goalkeeper")as HTMLSelectElement).value;
    let user2Goalkeeper: string = (document.getElementById("2goalkeeper")as HTMLSelectElement).value;
    let user1Player1: string = (document.getElementById("1player1")as HTMLSelectElement).value;
    let user1Player2: string = (document.getElementById("1player2")as HTMLSelectElement).value;
    let user1Player3: string = (document.getElementById("1player3")as HTMLSelectElement).value;
    let user2Player1: string = (document.getElementById("2player1")as HTMLSelectElement).value;
    let user2Player2: string = (document.getElementById("2player2")as HTMLSelectElement).value;
    let user2Player3: string = (document.getElementById("2player3")as HTMLSelectElement).value;

    let encoded1Name = encodeURIComponent(user1name);
    let encoded2Name = encodeURIComponent(user2name);
    let encoded1Goalkeeper = encodeURIComponent(user1Goalkeeper);
    let encoded2Goalkeeper = encodeURIComponent(user2Goalkeeper);
    let encoded1Player1 = encodeURIComponent(user1Player1);
    let encoded1Player2 = encodeURIComponent(user1Player2);
    let encoded1Player3 = encodeURIComponent(user1Player3);
    let encoded2Player1 = encodeURIComponent(user2Player1);
    let encoded2Player2 = encodeURIComponent(user2Player2);
    let encoded2Player3 = encodeURIComponent(user2Player3);
    console.log('ewifjewiofj')
    window.location.href = `../html/main.html?name1=${encoded1Name}&name2=${encoded2Name}&goalkeeper1=${encoded1Goalkeeper}&goalkeeper2=${encoded2Goalkeeper}&1player1=${encoded1Player1}&1player2=${encoded1Player2}&1player3=${encoded1Player3}&2player1=${encoded2Player1}&2player2=${encoded2Player2}&2player3=${encoded2Player3}`
}