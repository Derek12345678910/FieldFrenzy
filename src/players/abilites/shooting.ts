import { Shooting } from "../abilitytypes.js"

/**
 * Golden Boy ability: curves the player's shot for greater control or trickery.
 */
export class curveShot extends Shooting {
    public constructor() {
        super(
            "Golden Boy",
            "Curves the shot",
            false,
            2
        );
    }
}

/**
 * Vickings Wrath ability: guarantees a goal regardless of the situation.
 */
export class automaticGoal extends Shooting {
    public constructor() {
        super(
            "Vickings Wrath",
            "Goal No Matter What",
            false,
            1
        );
    }
}

/**
 * Rocket ability: increases the shot's range and power.
 */
export class longShot extends Shooting {
    public constructor() {
        super(
            "Rocket",
            "Increase the range and strength of the shot",
            false,
            1
        );
    }
}
