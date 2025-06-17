import { Player } from "../objects/player.js";

export class Attacker extends Player {
    protected _field_position = "Attacker";
}

export class Defender extends Player {
    protected _field_position = "Defender"
}

export class Utility extends Player {
    protected _field_position = "Midfielder"
}

export class Goalie extends Player {
    protected _field_position = "Goalkeeper"
}