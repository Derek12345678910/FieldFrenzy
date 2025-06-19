import { Attacker, Utility } from "../playertypes.js";
import { Pair } from "../../datastructures/pair.js";

import * as functionalilty from "../abilites/functionality.js";
import * as shooting from "../abilites/shooting.js";

/**
 * Kylian Mbappe: a fast and technical attacker with the Ghost Dribble ability.
 */
export class Mbappe extends Attacker {
    public constructor() {
        super(
            "Kylian Mbappe",
            new Pair(25, 25),
            new Pair(20, 20),
            "../Images/Mbappe.png",
            90,
            97,
            new functionalilty.stunOpponent()
        );
    }
}

/**
 * Erling Haaland: a powerful striker with the Automatic Goal ability.
 */
export class Haaland extends Attacker {
    public constructor() {
        super(
            "Erling Haaland",
            new Pair(30, 30),
            new Pair(20, 20),
            "../Images/Haaland.png",
            92,
            88,
            new shooting.automaticGoal()
        );
    }
}

/**
 * Lamine Yamal: a young, agile attacker with a curved shot ability.
 */
export class Yamal extends Attacker {
    public constructor() {
        super(
            "Lamine Yamal",
            new Pair(25, 25),
            new Pair(20, 20),
            "../Images/Yamal.png",
            75,
            82,
            new shooting.curveShot()
        );
    }
}

/**
 * Lionel Messi: a legendary playmaker known for precision and curve shots.
 */
export class Messi extends Attacker {
    public constructor() {
        super(
            "Lionel Messi",
            new Pair(20, 20),
            new Pair(20, 20),
            "../Images/Messi.png",
            94,
            80,
            new shooting.curveShot()
        );
    }
}

/**
 * Cristiano Ronaldo: a powerful forward with a long-range shooting ability.
 */
export class Cristiano extends Attacker {
    public constructor() {
        super(
            "Cristiano Ronaldo",
            new Pair(30, 30),
            new Pair(20, 20),
            "../Images/Ronaldo.png",
            92,
            80,
            new shooting.longShot()
        );
    }
}
