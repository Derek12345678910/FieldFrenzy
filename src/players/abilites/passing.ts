import { Passing } from "../abilitytypes.js"

/**
 * Thread Of Fate ability: a fast and precise pass toward a targeted teammate.
 */
export class perfectPass extends Passing {
    public constructor() {
        super(
            "Thread Of Fate",
            "A fast and precise pass toward a targeted teammate",
            false,
            2
        );
    }
}

/**
 * Trivela ability: a pass that can be curved, even around opponents.
 */
export class curvePassing extends Passing {
    public constructor() {
        super(
            "Trivela",
            "A pass that can be curved, even around opponents",
            false,
            1
        );
    }
}
