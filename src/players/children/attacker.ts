import { Attacker, Utility } from "../playertypes.js";

import { Pair } from "../../datastructures/pair.js";

import * as shooting from "../abilites/shooting.js"

export class Mbappe extends Attacker{
    public constructor(){
        super(
            "Kylian Mbappe",
            new Pair(5, 5),
            new Pair(10, 10),
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
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
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
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
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
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
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
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
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
            new shooting.CurveShot()
        )
    }
}
