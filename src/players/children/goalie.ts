import { Goalie } from "../playertypes.js";

import { Pair } from "../../datastructures/pair.js";

import * as unique from "../abilites/unique.js"

import * as hitbox from "../abilites/hitbox.js"

import * as functionalilty from "../abilites/functionality.js"

import * as shooting from "../abilites/shooting.js"

export class Hsiung extends Goalie{
    public constructor(){
        super(
            "Jeremy Hsiung",
            new Pair(20, 20),
            new Pair(20, 20),
            "../src/players/Images/Hsiung.png",
            20,
            64,
            new unique.theGreatWallOfChina()
        )
    }
}

export class Buffon extends Goalie{
    public constructor(){
        super(
            "Gigi Buffon",
            new Pair(30, 30),
            new Pair(20, 20),
            "../src/players/Images/Buffon.png",
            30,
            76,
            new hitbox.automaticSave()
        )
    }
}

export class Courtois extends Goalie{
    public constructor(){
        super(
            "Thibaut Courtois",
            new Pair(30, 30),
            new Pair(20, 20),
            "../src/players/Images/Courtois.png",
            70,
            70,
            new hitbox.automaticSave()
        )
    }
}