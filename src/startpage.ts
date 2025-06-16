import { List } from "./datastructures/list.js";
import { Player } from "./objects/player.js";

let player_list: List<string> = new List<string>();
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
console.log(player_list.sort(player_list.alphaAscendingSort));

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
    if(search === "pace"){

    }
    else if(search === "shot"){

    }
    
    let result: number[] = player_list.binarySearch(search, player_list.getSortedData(), player_list.alphaAscendingSearch);
    console.log(result);
    let html: string = ``
    for(let i=0;i<result.length;i++){
        html+=`${player_list.sortedData[result[i]]}  \n`
    }
    console.log(html)
    DISPLAY.innerText = html;
}

function displayUserOptions(page: string): void{
    if(page === "battle"){
        (document.getElementById("battle-options")as HTMLElement).style.display = "flex";
        (document.getElementById("player-display")as HTMLElement).style.display = "none"
    }
    else if(page === "players"){
        console.log("Display players");
        (document.getElementById("battle-options")as HTMLElement).style.display = "none";
        (document.getElementById("player-display")as HTMLElement).style.display = "block"
    }
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