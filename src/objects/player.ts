import { MovingObject } from "./movingObject.js";
import { Ability } from "../players/ability.js";

import { Vector } from "../datastructures/vector.js"
import { Pair } from "../datastructures/pair.js";

export class Player extends MovingObject {

    protected _power : number;

    protected _speed : number;

    protected _ability : Ability;

    protected constructor(size : Pair<number>, image : string, power : number, speed : number, ability : Ability){
        super(size, image);
        this._power = power;
        this._speed = speed;
        this._ability = ability;
    }

    public get power() : number {
        return this._power;
    }

    public get speed() : number {
        return this._speed;
    }

    public calculateNewVector(newVector : Vector): Vector {
        
    }

}