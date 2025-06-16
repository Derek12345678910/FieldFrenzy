import { Utility } from "../playertypes.js";

export class Derek extends Utility{
    public constructor(){
        super(
            "Bum Derek",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Lau.png",
            99,
            99,
            new shooting.CurveShot()
        )
    }
}

export class Iniesta extends Utility{
    public constructor(){
        super(
            "Andres Iniesta",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Iniesta.png",
            72,
            75,
            new shooting.CurveShot()
        )
    }
}

export class Modric extends Utility{
    public constructor(){
        super(
            "Luka Modric",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/Modric.png",
            76,
            72,
            new shooting.CurveShot()
        )
    }
}

export class DeBruyne extends Utility{
    public constructor(){
        super(
            "Kevin De Bruyne",
            new Pair(5, 5),
            new Pair(20, 20),
            "./Images/DeBruyne.png",
            87,
            67,
            new shooting.CurveShot()
        )
    }
}