import { MovingObject } from "./movingObject.js";
import { Vector } from "../datastructures/vector.js";

/**
 * An object that shows on the canvas depicting another object
 */
export class Mirage{

    private _object : MovingObject;

    private _position : Vector;

    public constructor(obj : MovingObject, pos : Vector){
        this._object = obj;
        this._position = pos;
    }

    public get object() : MovingObject{
        return this._object;
    }

    public get position() : Vector{
        return this._position;
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
        let sizeX : number = this._object.size.x;
        let sizeY : number = this._object.size.y;
        return (mouseX >= this._position.position.x && mouseX <= this._position.position.x + sizeX && mouseY >= this._position.position.y && mouseY <= this._position.position.y + sizeY);
    }

}