import { Goalie } from "../playertypes.js";
import { Pair } from "../../datastructures/pair.js";

import * as unique from "../abilites/unique.js";
import * as hitbox from "../abilites/hitbox.js";
import * as functionalilty from "../abilites/functionality.js";
import * as shooting from "../abilites/shooting.js";

/**
 * Jeremy Hsiung: a unique goalie with The Great Wall Of China ability, blocking all shots and passing forward.
 */
export class Hsiung extends Goalie {
    public constructor() {
        super(
            "Jeremy Hsiung",
            new Pair(20, 20),
            new Pair(20, 20),
            "../Images/Hsiung.png",
            20,
            64,
            new unique.theGreatWallOfChina()
        );
    }
}

/**
 * Gianluigi Buffon: a legendary keeper with an automatic net-blocking save ability.
 */
export class Buffon extends Goalie {
    public constructor() {
        super(
            "Gianluigi Buffon",
            new Pair(30, 30),
            new Pair(20, 20),
            "../Images/Buffon.png",
            30,
            76,
            new hitbox.automaticSave()
        );
    }
}

/**
 * Thibaut Courtois: a consistent and tall goalkeeper with full goal coverage on save.
 */
export class Courtois extends Goalie {
    public constructor() {
        super(
            "Thibaut Courtois",
            new Pair(30, 30),
            new Pair(20, 20),
            "../Images/Courtois.png",
            70,
            70,
            new hitbox.automaticSave()
        );
    }
}
