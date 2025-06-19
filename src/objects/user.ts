import { Team } from "./team.js";
import { Player } from "./player.js";

/**
 * Represents a user in the game.
 */
export class User {

    /**
     * The name of the user.
     */
    private _name: string;

    /**
     * The team the user belongs to.
     */
    private _team: Team;

    /**
     * The colour associated with the user.
     */
    private _colour: string;

    /**
     * Tracks whether the user has used their special ability.
     */
    private _usedAbility: boolean = false;

    /**
     * Creates a new User instance.
     * @param name - The name of the user.
     * @param team - The team the user belongs to.
     * @param colour - The colour associated with the user.
     */
    public constructor(name: string, team: Team, colour: string) {
        this._name = name;
        this._team = team;
        this._colour = colour;
    }

    /**
     * Moves the specified character to the given coordinates by calculating a path.
     * @param selectedCharacter - The character to be moved.
     * @param x - The x-coordinate to move to.
     * @param y - The y-coordinate to move to.
     */
    public moveCharacter(selectedCharacter: Player, x: number, y: number): void { 
        selectedCharacter.calculatePath(x, y);
    }

    /**
     * Displays the available options for a character when clicked.
     * This might include options such as moving, shooting, or using a special ability.
     * @param character - The character that was clicked on.
     */
    public displayOptions(character: Player): void {
        // this should show the page and an option to either move, shoot, or use ability
    }

    /**
     * Gets the name of the user
     * @returns The user's name.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Gets the team the user belongs to.
     * @returns The user's team.
     */
    public get team(): Team {
        return this._team;
    }

    /**
     * Gets the colour associated with the user.
     * @returns The user's colour.
     */
    public get colour(): string {
        return this._colour;
    }

    /**
     * Gets whether the user has used their special ability.
     * @returns `true` if the ability has been used, otherwise `false`.
     */
    public get usedAbility(): boolean {
        return this._usedAbility;
    }

    /**
     * Sets whether the user has used their special ability.
     * @param used - `true` if the ability has been used, otherwise `false`.
     */
    public set usedAbility(used: boolean) {
        this._usedAbility = used;
    }

}
