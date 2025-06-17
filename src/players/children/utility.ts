import { Utility } from "../playertypes.js";

import { Pair } from "../../datastructures/pair.js";

import * as unique from "../abilites/unique.js"

import * as hitbox from "../abilites/hitbox.js"

import * as functionalilty from "../abilites/functionality.js"

import * as shooting from "../abilites/shooting.js"

import * as passing from "../abilites/passing.js"

export class Derek extends Utility{
    public constructor(){
        super(
            "Bum Derek",
            new Pair(15, 15),
            new Pair(20, 20),
            "../src/players/Images/Lau.png",
            99,
            99,
            new functionalilty.certifiedBumMode()
        )
    }
}

export class Iniesta extends Utility{
    public constructor(){
        super(
            "Andres Iniesta",
            new Pair(25, 25),
            new Pair(20, 20),
            "../src/players/Images/Iniesta.png",
            72,
            75,
            new passing.perfectPass()
        )
    }
}

export class Modric extends Utility{
    public constructor(){
        super(
            "Luka Modric",
            new Pair(25, 25),
            new Pair(20, 20),
            "../src/players/Images/Modric.png",
            76,
            72,
            new passing.curvePassing()
        )
    }
}

export class DeBruyne extends Utility{
    public constructor(){
        super(
            "Kevin De Bruyne",
            new Pair(25, 25),
            new Pair(20, 20),
            "../src/players/Images/DeBruyne.png",
            87,
            67,
            new passing.perfectPass()
        )
    }
}