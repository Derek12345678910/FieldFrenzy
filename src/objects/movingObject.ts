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

    abstract calculateNewVector(newVector : Vector) : Vector

}