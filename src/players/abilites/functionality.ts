import { Functionality } from "../abilitytypes.js"

/**
 * Ghost Dribble ability: stuns the opponent by shifting around them.
 */
export class stunOpponent extends Functionality {
    public constructor() {
        super(
            "Ghost Dribble",
            "A dribbling move that swiftly shifts the player around the opponent, stunning them in place",
            false,
            2
        );
    }
}

/**
 * Flash Step ability: teleports the player a short distance while holding the ball.
 */
export class teleportation extends Functionality {
    public constructor() {
        super(
            "Flash Step",
            "When activated while holding the ball, the player teleports a short distance in the direction they’re facing",
            false,
            1
        );
    }
}

/**
 * Extra Turn ability: grants an extra move or shot depending on possession.
 */
export class fasterSpeed extends Functionality {
    public constructor() {
        super(
            "Extra Turn",
            "When activated, this ability grants an extra turn: with the ball, the player can move and shoot; without the ball, the player can move twice",
            false,
            2
        );
    }
}

/**
 * Certified Bum Mode: instantly defeats the player who activates it.
 */
export class certifiedBumMode extends Functionality {
    public constructor() {
        super(
            "Certified Bum Mode",
            "When activated, the player instantly loses the game as the ability triggers an immediate defeat due to their incompetence",
            false,
            10
        );
    }
}

/**
 * Emperor’s Dribble: fast zig-zag dribble forward covering a large distance.
 */
export class emperorsDribble extends Functionality {
    public constructor() {
        super(
            "Emperor’s Dribble",
            "When activated, the player performs a fast zig-zag dribble forward, covering a large distance",
            false,
            1
        );
    }
}

/**
 * Ability Jam: disables the abilities of the opponent who has the ball.
 */
export class disableAbility extends Functionality {
    public constructor() {
        super(
            "Ability Jam",
            "Disable the abilities of the opponent with the ball",
            false,
            2
        );
    }
}
