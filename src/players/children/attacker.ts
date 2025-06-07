import { Attacker } from "../playertypes.js";

import { Pair } from "../../datastructures/pair.js";

import * as shooting from "../abilites/shooting.js"

export class Yamal extends Attacker{
    public constructor(){
        super(
            new Pair(2, 2),
            new Pair(2, 2),
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
            new shooting.CurveShot()
        )
    }
}
