import { MovingObject } from "./movingObject.js";
import { Vector } from "../datastructures/vector.js";

/**
 * An object that shows on the canvas depicting another object
 */
export class Mirage{

    private _object : MovingObject;

    private _position : Vector;

    /**
     * Creates mirage object
     * @param obj object its a mirage of
     * @param pos position of the mirage
     */
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

    /**
     * Checks if the mirage is clicked
     * @param mouseX x mouse
     * @param mouseY y mouse
     * @returns returns true if clicked
     */
    public isClicked(mouseX: number, mouseY: number): boolean {
        let left: number = this._position.position.x - (this._object.size.x)
        let right: number = this._position.position.x + (this._object.size.x)
        let top: number = this._position.position.y - (this._object.size.y)
        let bottom: number = this._position.position.y + (this._object.size.y);
        return (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom);
    }

}