import { Passing } from "../abilitytypes.js"

export class perfectPass extends Passing{
    public constructor(){
        super(
            "Thread Of Fate",
            "A fast and precise pass toward a targeted teammate",
            false
        )
    }
}

export class curvePassing extends Passing{
    public constructor(){
        super(
            "Trivela",
            "A pass that can be curved, even around opponents",
            false
        )
    }
}