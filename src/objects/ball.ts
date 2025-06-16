import { Vector } from "../datastructures/vector.js";
import { MovingObject } from "./movingObject.js";
import { Player } from "./player.js";
import { Mirage } from "./mirage.js";

import { Pair } from "../datastructures/pair.js";

export class Ball extends MovingObject{

    private _possession : Player;

    protected _object : MovingObject = this;

    /**
     * (Startpoint, direction)
     */
    protected _path : Vector | null;

    /**
     * Final point
     */
    protected maxPathPoint : Pair<number> | null; // is the last point on the path

    private _canBePossessed : boolean; // checks if the ball is able to possessed

    private MOVELIMIT : number = 20; // 20 units move limit

    public constructor(hitbox : Pair<number>, size : Pair<number>, image : string){
        super(hitbox, size, image)
    }

    public get possession() : Player{
        return this._possession;
    }

    public set possession(player : Player){
        this._possession = player;
    }

    public get canBePossessed() : boolean{
        return this._canBePossessed;
    }

    public set canBePossessed(canBe : boolean) {
        this._canBePossessed = canBe;
    }

    public override calculatePath(x: number, y: number): Vector {
        let directionPath : Pair<number> = new Pair<number>(x - this._position.position.x, y - this._position.position.y);
                
        // set path to this
        this._path = new Vector(this._position.position, directionPath);
        this._position.direction = directionPath; // make the player face the direction its heading

        // find max point
        // we have the max magnitude so we just need the T value of where the point is
        // so solve for T
        let sx :  number = this._position.position.x; let sy : number = this._position.position.y;
        let dx : number = directionPath.x; let dy : number = directionPath.y;
        let t1 : number = (-(sx * dx + sy * dy) + (Math.sqrt((sx * dx + sy * dy)**2 - 4*(dx*dx + dy*dy) * (sx*sx + sy*sy - this.MOVELIMIT)))) / 2*(dx*dx + dy*dy);
        let lastPoint : Pair<number> = new Pair<number>(this._position.position.x + t1*dx, this._position.position.y + t1*dy);

        this.maxPathPoint = lastPoint;

        let endPoint : Vector = new Vector(lastPoint, directionPath);
        
        this._mirage = new Mirage(this, endPoint)

        // set path to starting point
        this._path.position = this._position.position;

        return this._path;
    }

}