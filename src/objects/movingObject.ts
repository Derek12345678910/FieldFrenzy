import { Vector } from "../datastructures/vector.js";
import { Pair } from "../datastructures/pair.js";
import { List } from "../datastructures/list.js";

import { Mirage } from "./mirage.js";

export abstract class MovingObject {
    
    protected _position : Vector;   

    protected _size : Pair<number>; // x is width, y is height 

    protected _hitbox : Pair<number>;

    protected _imageSrc : string;
 
    protected _image : HTMLImageElement;

    protected _curPath : number = 0;

    protected _mirage : Mirage | null;

    // the stage of turn the object is on
    protected _stage : number = 0;

    /** Represents whether or not the object is currently moving */
    protected _ismoving : boolean = false;

    // store all paths that have happened (replay system or something if wanted)
    protected _paths : List<Vector> = new List<Vector>;

    protected _destinations : List<Pair<number>> = new List<Pair<number>>();
    
    protected _movementPosition : Pair<number>;
    
    protected constructor(hitbox : Pair<number>, size : Pair<number>, image : string) {
        this._hitbox = hitbox;
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
        this._movementPosition = pos.position;
    }

    public get size() : Pair<number> {
        return this._size;
    }

    public get hitbox() : Pair<number> {
        return this._hitbox; 
    }

    public get image() : HTMLImageElement {
        return this._image;
    }

    public get paths() : List<Vector>{
        return this._paths;
    }

    public get mirage() : Mirage | null{
        if(this._mirage){
            return this._mirage;
        }
        return null
    }

    public get curPath() : number{
        return this._curPath;
    }

    public get destinations() : List<Pair<number>> {
        return this._destinations;
    }

    public set curPath(cur : number){
        this._curPath = cur;
    } 

    public get stage() : number{
        return this._stage;
    }

    public set stage(stage : number){
        this._stage = stage;
    }

    public get ismoving() : boolean{
        return this._ismoving;
    }

    public set ismoving(move : boolean){
        this._ismoving = move;
    }

    public get movementPosition() : Pair<number>{
        return this._movementPosition;
    }

    public set movementPosition(move : Pair<number>){
        this._movementPosition = move;
    }

    abstract calculatePath(x : number, y : number) : void

}