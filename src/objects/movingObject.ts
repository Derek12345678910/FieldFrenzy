import { Vector } from "../datastructures/vector.js";
import { Pair } from "../datastructures/pair.js";

export abstract class MovingObject {
    
    protected _position : Vector;   

    protected _size : Pair<number>; // x is width, y is height 

    protected _imageSrc : string;

    protected _image : HTMLImageElement;

    protected constructor(size : Pair<number>, image : string) {
        this._size = size;
        this._imageSrc = image;
        this._image = new Image()
        this._image.src = this._imageSrc;
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

    public get image() : HTMLImageElement {
        return this._image;
    }

    abstract calculateNewVector(newVector : Vector) : Vector

}