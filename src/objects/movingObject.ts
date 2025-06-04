import { Vector } from "../datastructures/vector.js";
import { Pair } from "../datastructures/pair.js";

export abstract class MovingObject {
    
    protected _position : Vector;   

    protected _size : Pair<number>; // x is width, y is height 

    protected _image : string;

    protected constructor(size : Pair<number>, image : string) {
        this._size = size;
        this._image = image;
    }

    public get position() : Vector{
        return this._position;
    }

    public set position(pos : Vector) {
        this._position = pos;
    }

    public get size() : Pair<number> {
        return this._size;
    }

    public get image() : string {
        return this._image;
    }

    abstract calculateNewVector(newVector : Vector) : Vector

}