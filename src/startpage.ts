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

/**
 * Extracts the names of all players in the given list.
 * @param {List<Player>} data - List of players to extract names from.
 * @returns {List<string>} A list containing the names of the players.
 */
function getNames(data: List<Player>): List<string> {
    let player_names: List<string> = new List<string>();
    for (let i = 0; i < data.getData().length; i++) {
        player_names.push(data.getData()[i].name);
    }
    return player_names;
}

/**
 * Extracts the power (kick strength) values of all players in the given list.
 * @param {List<Player>} data - List of players to extract power values from.
 * @returns {List<number>} A list containing the power values of the players.
 */
function getKicks(data: List<Player>): List<number> {
    let player_kicks: List<number> = new List<number>();
    for (let i = 0; i < data.getData().length; i++) {
        player_kicks.push(data.getData()[i].power);
    }
    return player_kicks;
}

/**
 * Extracts the speed (pace) values of all players in the given list.
 * @param {List<Player>} data - List of players to extract speed values from.
 * @returns {List<number>} A list containing the speed values of the players.
 */
function getPaces(data: List<Player>): List<number> {
    let player_paces: List<number> = new List<number>();
    for (let i = 0; i < data.getData().length; i++) {
        player_paces.push(data.getData()[i].speed);
    }
    return player_paces;
}

// battle button
const BATTLEBUTTON: HTMLButtonElement = document.getElementById("battle-button") as HTMLButtonElement;
// view players button
const VIEWPLAYERSBUTTON: HTMLButtonElement = document.getElementById("view-players-button") as HTMLButtonElement;
// filter input
const FILTERINPUT: HTMLSelectElement = document.getElementById("filter-type") as HTMLSelectElement;

// add click listener to start battle button
BATTLEBUTTON.addEventListener("click", () => {
    hideStartPage();
    displayUserOptions("battle");
});
console.log(BATTLEBUTTON);

// add click listener to view players button
VIEWPLAYERSBUTTON.addEventListener("click", () => {
    hideStartPage();
    displayUserOptions("players");
});

// click listener for the filter button, that filters all players
(document.getElementById("filter-button") as HTMLButtonElement).addEventListener("click", filter);
// click listener that for the start game button, that starts the game
(document.getElementById("game-start-button") as HTMLButtonElement).addEventListener("click", startGame);

/**
 * Hides all elements from the starting page to transition the UI.
 */
function hideStartPage(): void {
    BATTLEBUTTON.hidden = true;
    VIEWPLAYERSBUTTON.hidden = true;
    (document.getElementById("title") as HTMLElement).hidden = true;
}

const DISPLAY = document.getElementById("players") as HTMLParagraphElement;

/**
 * Filters the players list based on the selected filter type,
 * then displays the filtered or sorted list.
 */
function filter(): void {
    let search = FILTERINPUT.value;
    console.log(search);
    let indexes: List<number> = new List<number>();
    if (search === "goalkeeper") {
        for (let i = 0; i < game_players.getData().length; i++) {
            if (game_players.getData()[i].field_position === "Goalkeeper") {
                indexes.push(i);
            }
        }
    } else if (search === "defender") {
        for (let i = 0; i < game_players.getData().length; i++) {
            if (game_players.getData()[i].field_position === "Defender") {
                indexes.push(i);
            }
        }
    } else if (search === "midfielder") {
        for (let i = 0; i < game_players.getData().length; i++) {
            if (game_players.getData()[i].field_position === "Midfielder") {
                indexes.push(i);
            }
        }
    } else if (search === "attacker") {
        for (let i = 0; i < game_players.getData().length; i++) {
            if (game_players.getData()[i].field_position === "Attacker") {
                indexes.push(i);
            }
        }
    } else if (search === "alpha-ascending") {
        let sortedIndexes: number[] = (getNames(game_players).sort(game_players.alphaAscendingSort));
        for (let i = 0; i < sortedIndexes.length; i++) {
            indexes.push(sortedIndexes[i]);
        }
    } else if (search === "alpha-descending") {
        let sortedIndexes: number[] = (getNames(game_players).sort(game_players.alphaDescendingSort));
        for (let i = 0; i < sortedIndexes.length; i++) {
            indexes.push(sortedIndexes[i]);
        }
    } else if (search === "kick") {
        let sortedIndexes: number[] = (getKicks(game_players).sort(game_players.ascendingSort));
        for (let i = 0; i < sortedIndexes.length; i++) {
            indexes.push(sortedIndexes[i]);
        }
    } else if (search === "pace") {
        let sortedIndexes: number[] = (getPaces(game_players).sort(game_players.ascendingSort));
        for (let i = 0; i < sortedIndexes.length; i++) {
            indexes.push(sortedIndexes[i]);
        }
    } else {
        displayFiltered();
        return;
    }
    displayFiltered(indexes.getData());
}

/**
 * Displays the filtered list of players given their indexes.
 * Defaults to showing all players if no indexes provided.
 * @param {number[]} [indexes=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]] - indexes of players to display.
 */
function displayFiltered(indexes: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]): void {
    let html: string = ``;
    for (let i = 0; i < indexes.length; i++) {
        html += `
        <div class="player-container">
            <p class="player-name">${game_players.unsortedData[indexes[i]].name}</p>
            <img class="player-image" src='${game_players.unsortedData[indexes[i]].image.src}'> 
            <p class="player-position">Position: ${game_players.unsortedData[indexes[i]].field_position}</p>
            <p class="player-pace">Pace: ${game_players.unsortedData[indexes[i]].speed}</p>
            <p class="player-power">Kick: ${game_players.unsortedData[indexes[i]].power}</p>
        </div>
        \n`;
    }
    DISPLAY.innerHTML = html;
}

/**
 * Displays UI options based on the selected page.
 * @param {string} page - The page to display, either "battle" or "players".
 */
function displayUserOptions(page: string): void {
    if (page === "battle") {
        (document.getElementById("battle-options") as HTMLElement).style.display = "flex";
        (document.getElementById("player-display") as HTMLElement).style.display = "none";
    } else if (page === "players") {
        console.log("Display players");
        (document.getElementById("battle-options") as HTMLElement).style.display = "none";
        (document.getElementById("player-display") as HTMLElement).style.display = "block";
        displayFiltered();
    }
}

/**
 * Starts the game by collecting user inputs and
 * navigating to the main game page with URL parameters.
 */
function startGame(): void {
    let user1name: string = (document.getElementById("user1-name") as HTMLInputElement).value;
    let user2name: string = (document.getElementById("user2-name") as HTMLInputElement).value;
    let user1Goalkeeper: string = (document.getElementById("1goalkeeper") as HTMLSelectElement).value;
    let user2Goalkeeper: string = (document.getElementById("2goalkeeper") as HTMLSelectElement).value;
    let user1Player1: string = (document.getElementById("1player1") as HTMLSelectElement).value;
    let user1Player2: string = (document.getElementById("1player2") as HTMLSelectElement).value;
    let user1Player3: string = (document.getElementById("1player3") as HTMLSelectElement).value;
    let user2Player1: string = (document.getElementById("2player1") as HTMLSelectElement).value;
    let user2Player2: string = (document.getElementById("2player2") as HTMLSelectElement).value;
    let user2Player3: string = (document.getElementById("2player3") as HTMLSelectElement).value;

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
    console.log('Starting game with selected players and users');
    window.location.href = `../html/main.html?name1=${encoded1Name}&name2=${encoded2Name}&goalkeeper1=${encoded1Goalkeeper}&goalkeeper2=${encoded2Goalkeeper}&1player1=${encoded1Player1}&1player2=${encoded1Player2}&1player3=${encoded1Player3}&2player1=${encoded2Player1}&2player2=${encoded2Player2}&2player3=${encoded2Player3}`;
}
