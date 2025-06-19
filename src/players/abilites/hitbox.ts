import { Hitbox } from "../abilitytypes.js"

/**
 * Phantom Reach ability: expands the player's hitbox to steal the ball from opponents.
 */
export class extendedHitbox extends Hitbox {
    public constructor() {
        super(
            "Phantom Reach",
            "When activated, the player’s hitbox expands to steal the ball from opponents",
            false,
            1
        );
    }
}

/**
 * Immovable Object ability: expands the goalkeeper's hitbox to block all shots and abilities.
 */
export class automaticSave extends Hitbox {
    public constructor() {
        super(
            "Immovable Object",
            "When activated, the goalkeeper’s hitbox expands to cover the entire net, blocking all incoming shots and abilities",
            false,
            2
        );
    }
}
