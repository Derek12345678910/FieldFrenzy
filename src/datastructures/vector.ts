import { Pair } from "./pair.js";

/**
 * Is a 2D Vector structure that has a position and direction
 */
export class Vector {

    private _position : Pair<number>;
    
    private _direction : Pair<number>;

    /**
     * Create a 2D vector object
     * @param pos position of the vector
     * @param dir direction of the vector
     */
    public constructor(pos : Pair<number>, dir : Pair<number>){
        this._position = pos;
        this._direction = dir;
    }

    public get position() : Pair<number> {
        return this._position;
    }

    public get direction() : Pair<number> {
        return this._direction;
    }

}