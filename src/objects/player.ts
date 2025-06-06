import { MovingObject } from "./movingObject.js";
import { Ability } from "../players/ability.js";

import { Vector } from "../datastructures/vector.js"
import { Pair } from "../datastructures/pair.js";

export class Player extends MovingObject {

    protected _name : string;

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

    public get name() : string{
        return this._name;
    }

    public calculateNewVector(newVector : Vector): Vector {
        return newVector;
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
        console.log(this)
        return (mouseX >= this._position.position.x && mouseX <= this._position.position.x + this._size.x && mouseY >= this._position.position.y && mouseY <= this._position.position.y + this._size.y);
    }
}