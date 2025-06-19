import { Pair } from "./pair.js";

/**
 * Represents a 2D vector with a position and a direction
 * This class can be used to model movement or orientation in 2D space,
 * where both the position and direction are expressed as (x, y) pairs
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

    /**
     * Gets the current position of the vector
     * @returns The position as a Pair<number>
     */
    public get position() : Pair<number> {
        return this._position;
    }

    /**
     * Sets the position of the vector
     * @param newPos - The new position as a Pair<number>
     */
    public set position(newPos : Pair<number>){
        this._position = newPos;
    } 

    /**
     * Gets the current direction of the vector
     * @returns The direction as a Pair<number>
     */
    public get direction() : Pair<number> {
        return this._direction;
    }

    /**
     * Sets the direction of the vector
     * @param newDir - The new direction as a Pair<number>
     */
    public set direction(newDir : Pair<number>) {
        this._direction = newDir;
    }

}