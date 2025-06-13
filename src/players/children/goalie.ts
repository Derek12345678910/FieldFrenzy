import { Goalie } from "../playertypes.js";

export class Hsiung extends Goalie{
    public constructor(){
        super(
            "Jeremy Hsiung",
            new Pair(5, 5),
            new Pair(20, 20),
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
            new shooting.CurveShot()
        )
    }
}

export class Buffon extends Goalie{
    public constructor(){
        super(
            "Gigi Buffon",
            new Pair(5, 5),
            new Pair(20, 20),
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
            new shooting.CurveShot()
        )
    }
}

export class Courtois extends Defender{
    public constructor(){
        super(
            "Thibaut Courtois",
            new Pair(5, 5),
            new Pair(20, 20),
            "https://ichef.bbci.co.uk/ace/standard/3840/cpsprodpb/3bb3/live/817192c0-3b28-11f0-b0d7-71720076f013.jpg",
            15,
            15,
            new shooting.CurveShot()
        )
    }
}