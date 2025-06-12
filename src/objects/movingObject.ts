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

    protected _path : Vector | null;

    protected _mirage : Mirage | null;

    // the stage of turn the object is on
    protected _stage : number = 0;

    // store all paths that have happened (replay system or something if wanted)
    protected _allPaths : List<Vector> = new List<Vector>;
    
    protected _curPath : number = 0;

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

    public get path() : Vector | null{
        return this._path;
    }

    public set path(path : Vector | null) {
        this._path = path;
    }

    public get mirage() : Mirage | null{
        return this._mirage;
    }

    public get allPaths() : List<Vector>{
        return this._allPaths;
    }

    public get curPath() : number {
        return this._curPath;
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

    abstract calculatePath(x : number, y : number) : Vector

}