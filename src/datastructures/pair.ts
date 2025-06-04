/**
 * Is a Pair that holds an x value and y value
 */
export class Pair<T>{

    // x value
    private _x : T;
    // y value
    private _y : T;
    
    /**
     * Creates a Pair datatype
     * @param x the x value in the Pair
     * @param y the y value in the Pair
     */
    public constructor(x : T, y : T){
        this._x = x;
        this._y = y;
    }

    /**
     * @returns the x value of the Pair
     */
    public get x() : T{
        return this._x;
    }

    /**
     * @returns the y value of the Pair
     */
    public get y() : T{
        return this._y;
    }

    /**
     * @param x the x value of the Pair
     * sets the x value of the Pair
     */
    public set x(x : T){
        this._x = x;
    }

    /**
     * @param y the y value of the Pair
     * sets the y value of the Pair
     */
    public set y(y : T){
        this._y = y;
    }

}