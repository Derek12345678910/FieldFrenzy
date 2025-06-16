import { Unique } from "../abilitytypes.js"

export class theGreatWallOfChina extends Unique{
    public constructor(){
        super(
            "The Great Wall Of China",
            "This ability expands the goalkeeper’s hitbox to cover the entire net, blocking all shots and abilities, then instantly launches a powerful pass to the furthest teammate",
            false,
            2
        )
    }
}

export class hsiungPassive extends Unique{
    public constructor(){
        super(
            "Chinese Aura",
            "When the opponent shoots from inside the box it becomes an automatic goal",
            true,
            0
        )
    }
}

export class derekPassive extends Unique{
    public constructor(){
        super(
            "Bum Stats",
            "After each turn, remove 5 stat points from each stat",
            true,
            0
        )
    }
}