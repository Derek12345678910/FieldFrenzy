import { Vector } from "../datastructures/vector.js";
import { MovingObject } from "./movingObject.js";
import { Player } from "./player.js";

import { Pair } from "../datastructures/pair.js";

export class Ball extends MovingObject{

    private _possession : Player;

    private _canBePossessed : boolean; // checks if the ball is able to possessed

    public constructor(hitbox : Pair<number>, size : Pair<number>, image : string){
        super(hitbox, size, image)
    }

    public get possession() : Player{
        return this._possession;
    }

    public set possession(player : Player){
        this._possession = player;
    }

    public get canBePossessed() : boolean{
        return this._canBePossessed;
    }

    public set canBePossessed(canBe : boolean) {
        this._canBePossessed = canBe;
    }

    public override calculateNewVector(newVector: Vector): Vector {
        return newVector;
    }

}