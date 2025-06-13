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

export class AutomaticGoal extends Shooting{
    public constructor(){
        super(
            "Vickings Wrath",
            "Goal No Matter What",
            false
        )
    }
}

export class LongShot extends Shooting{
    public constructor(){
        super(
            "Long Shot",
            "Curves the shot",
            false
        )
    }
}