import { Goalie } from "../playertypes.js";

export class Hsiung extends Goalie{
    public constructor(){
        super(
            "Jeremy Hsiung",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Hsiung.png",
            20,
            64,
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
            "./Imnages/Buffon.png",
            30,
            76,
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
            "./Images/Courtois.png",
            70,
            70,
            new shooting.CurveShot()
        )
    }
}