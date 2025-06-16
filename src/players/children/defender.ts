import { Defender } from "../playertypes.js";

export class Maldini extends Defender{
    public constructor(){
        super(
            "Paolo Maldini",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Maldini.png",
            56,
            86,
            new shooting.CurveShot()
        )
    }
}

export class VanDijk extends Defender{
    public constructor(){
        super(
            "Virgil Van Dijk",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/VanDijk.png",
            60,
            78,
            new shooting.CurveShot()
        )
    }
}

export class Alphonso extends Defender{
    public constructor(){
        super(
            "Alphonso Davies",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Davies",
            66,
            95,
            new shooting.CurveShot()
        )
    }
}