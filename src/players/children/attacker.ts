import { Attacker, Utility } from "../playertypes.js";

import { Pair } from "../../datastructures/pair.js";

import * as shooting from "../abilites/shooting.js"

export class Mbappe extends Attacker{
    public constructor(){
        super(
            "Kylian Mbappe",
            new Pair(5, 5),
            new Pair(10, 10),
            "./Images/Mbappe.png",
            90,
            97,
            new shooting.StunOpponenet()
        )
    }
}

export class Haaland extends Attacker{
    public constructor(){
        super(
            "Earling Haaland",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Haaland.png",
            92,
            88,
            new shooting.AutomaticGoal()
        )
    }
}

/**
 * Lamine Yamal Object
 */
export class Yamal extends Attacker{
    public constructor(){
        super(
            "Lamine Yamal",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Yamal.png",
            75,
            82,
            new shooting.CurveShot()
        )
    }
}

export class Messi extends Attacker{
    public constructor(){
        super(
            "Lionel Messi",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Messi.png",
            15,
            15,
            new shooting.CurveShot()
        )
    }
}

export class Cristiano extends Attacker{
    public constructor(){
        super(
            "Cristiano Ronaldo",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Ronaldo.png",
            93,
            92,
            new shooting.LongShot()
        )
    }
}
