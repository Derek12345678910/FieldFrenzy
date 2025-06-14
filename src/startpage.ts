import { List } from "./datastructures/list.js";
import { Player } from "./objects/player.js";

let player_list: List<string> = new List<string>();
player_list.push("Yamal")
player_list.push("Messi")
player_list.push("Ronaldo")
player_list.push("Yamal")
player_list.push("Mbappe")
player_list.push("Haaland")
player_list.push("Martinelli")
player_list.push("Zidane");
console.log(player_list.sort(player_list.alphaAscendingSort));

// battle button
const BATTLEBUTTON: HTMLButtonElement = document.getElementById("battle-button") as HTMLButtonElement;
// view players button
const VIEWPLAYERSBUTTON: HTMLButtonElement = document.getElementById("view-players-button") as HTMLButtonElement;

console.log((document.getElementById("battle-options")as HTMLElement).hidden)
BATTLEBUTTON.addEventListener("click",()=>{
    hideStartPage();
    displayUserOptions("battle");
});

VIEWPLAYERSBUTTON.addEventListener("click", ()=>{
    hideStartPage();
    displayUserOptions("players");
});

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
const DISPLAY = document.getElementById("display") as HTMLParagraphElement;


function handleSearch(search: string): void{
    SEARCHBAR.value = "";
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
        (document.getElementById("selection-title")as HTMLElement).hidden = false;
    }
    else if(page === "players"){
        console.log("Display players")
    }
}