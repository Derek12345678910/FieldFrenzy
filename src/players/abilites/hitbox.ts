import { Hitbox } from "../abilitytypes.js"

export class extendedHitbox extends Hitbox{
    public constructor(){
        super(
            "Phantom Reach",
            "When activated, the player’s hitbox expands to steal the ball from opponents",
            false,
            1
        )
    }
}

export class automaticSave extends Hitbox{
    public constructor(){
        super(
            "Immovable Object",
            "When activated, the goalkeeper’s hitbox expands to cover the entire net, blocking all incoming shots and abilities",
            false,
            2
        )
    }
}