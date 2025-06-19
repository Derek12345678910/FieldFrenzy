import { Player } from "../objects/player.js";

/**
 * Represents a player in the Attacker role.
 */
export class Attacker extends Player {
    protected _field_position = "Attacker";
}

/**
 * Represents a player in the Defender role.
 */
export class Defender extends Player {
    protected _field_position = "Defender";
}

/**
 * Represents a player in the Midfielder (Utility) role.
 */
export class Utility extends Player {
    protected _field_position = "Midfielder";
}

/**
 * Represents a player in the Goalkeeper role.
 */
export class Goalie extends Player {
    protected _field_position = "Goalkeeper";
}
