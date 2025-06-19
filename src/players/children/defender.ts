import { Defender } from "../playertypes.js";
import { Pair } from "../../datastructures/pair.js";

import * as unique from "../abilites/unique.js";
import * as hitbox from "../abilites/hitbox.js";
import * as functionalilty from "../abilites/functionality.js";
import * as shooting from "../abilites/shooting.js";

/**
 * Paolo Maldini: a classic defender who can disable the opponent's abilities.
 */
export class Maldini extends Defender {
    public constructor() {
        super(
            "Paolo Maldini",
            new Pair(35, 35),
            new Pair(20, 20),
            "../Images/Maldini.png",
            56,
            86,
            new functionalilty.disableAbility()
        );
    }
}

/**
 * Virgil Van Dijk: a strong and composed defender with an extended reach.
 */
export class VanDijk extends Defender {
    public constructor() {
        super(
            "Virgil Van Dijk",
            new Pair(35, 35),
            new Pair(20, 20),
            "../Images/VanDijk.png",
            60,
            78,
            new hitbox.extendedHitbox()
        );
    }
}

/**
 * Alphonso Davies: a fast and agile fullback with the ability to gain extra turns.
 */
export class Alphonso extends Defender {
    public constructor() {
        super(
            "Alphonso Davies",
            new Pair(35, 35),
            new Pair(20, 20),
            "../Images/Davies.png",
            66,
            95,
            new functionalilty.fasterSpeed()
        );
    }
}
