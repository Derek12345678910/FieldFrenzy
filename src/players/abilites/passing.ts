import { Passing } from "../abilitytypes.js"

export class PerfectPass extends Passing{
    public constructor(){
        super(
            "Perfect Pass",
            "A fast and precise pass toward a targeted teammate",
            false
        )
    }
}

export class CurvePassing extends Passing{
    public constructor(){
        super(
            "Curve Pass",
            "A pass that can be curved, even around opponents",
            false
        )
    }
}