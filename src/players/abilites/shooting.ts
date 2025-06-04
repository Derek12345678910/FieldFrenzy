import { Shooting } from "../abilitytypes.js"

export class CurveShot extends Shooting{
    public constructor(){
        super(
            "Curve SHOT",
            "Curves the shot",
            false
        )
    }
}