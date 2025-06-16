import { Shooting } from "../abilitytypes.js"

export class curveShot extends Shooting{
    public constructor(){
        super(
            "Golden Boy",
            "Curves the shot",
            false,
            2
        )
    }
}

export class automaticGoal extends Shooting{
    public constructor(){
        super(
            "Vickings Wrath",
            "Goal No Matter What",
            false,
            1
        )
    }
}

export class longShot extends Shooting{
    public constructor(){
        super(
            "Rocket",
            "Increase the range and strength of the shot",
            false,
            1
        )
    }
}