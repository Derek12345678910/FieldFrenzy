import { Unique } from "../abilitytypes.js"

/**
 * The Great Wall Of China ability: expands the goalkeeper’s hitbox to block all shots and abilities,
 * then launches a powerful pass to the furthest teammate.
 */
export class theGreatWallOfChina extends Unique {
    public constructor() {
        super(
            "The Great Wall Of China",
            "This ability expands the goalkeeper’s hitbox to cover the entire net, blocking all shots and abilities, then instantly launches a powerful pass to the furthest teammate",
            false,
            2
        );
    }
}

/**
 * Chinese Aura passive: any shot taken by the opponent from inside the box becomes an automatic goal.
 */
export class hsiungPassive extends Unique {
    public constructor() {
        super(
            "Chinese Aura",
            "When the opponent shoots from inside the box it becomes an automatic goal",
            true,
            0
        );
    }
}

/**
 * Bum Stats passive: after each turn, remove 5 stat points from every stat.
 */
export class derekPassive extends Unique {
    public constructor() {
        super(
            "Bum Stats",
            "After each turn, remove 5 stat points from each stat",
            true,
            0
        );
    }
}
