import { Vector } from "../datastructures/vector.js";
import { MovingObject } from "./movingObject.js";
import { Player } from "./player.js";
import { Mirage } from "./mirage.js";
import { Team } from "./team.js";

import { Pair } from "../datastructures/pair.js";

/**
 * Represents a soccer ball or similar object that moves within a game field
 */
export class Ball extends MovingObject{

    private _possession : Player | null;

    protected _object : MovingObject = this;

    /** Final point */
    protected maxPathPoint : Pair<number> | null; // is the last point on the path

    private _canBePossessed : boolean; // checks if the ball is able to possessed

    private MOVELIMIT : number = 20; // 20 units move limit

    /** Controls whether the ball can move */
    private _canMove : boolean = true;

    /**
     * Constructs a new Ball object with a hitbox, size, and image
     * @param hitbox - A pair representing the ball's hitbox position
     * @param size - A pair representing the size (width/height) of the ball
     * @param image - Path or identifier of the ball's image/texture
     */
    public constructor(hitbox : Pair<number>, size : Pair<number>, image : string){
        super(hitbox, size, image)
    }

    /**
     * Calculates the movement path for the ball toward a given destination
     * Adds the path to the internal list and creates a mirage to simulate motion
     * @param x - Target x-coordinate
     * @param y - Target y-coordinate
     */
    public override calculatePath(x: number, y: number): void {
        let lastPoint : Pair<number> = new Pair<number>(x, y);

        this._destinations.push(lastPoint);

        // take from the new start
        let newStart : Pair<number> = (this._stage === 0) ? this._position.position : this._destinations.get(this._curPath + this._stage - 1) as Pair<number>;

        let directionPath : Pair<number> = new Pair<number>(x - newStart.x, y - newStart.y);

        // set path to this
        let newPath : Vector = new Vector(newStart, directionPath);

        // find max point
        // we have the max magnitude so we just need the T value of where the point is
        // so solve for T
        /*
        let sx :  number = newStart.x; let sy : number = newStart.y;
        let dx : number = newPath.direction.x; let dy : number = newPath.direction.y;

        const A = dx * dx + dy * dy;
        const B = 2 * (sx * dx + sy * dy);
        const C = sx * sx + sy * sy - this.MOVELIMIT;

        const discriminant = B * B - 4 * A * C;

        const sqrtDiscriminant = Math.sqrt(discriminant);

        const t1 = (-B + sqrtDiscriminant) / (2 * A);

        //let t1 : number = (-(sx * dx + sy * dy) + (Math.sqrt((sx * dx + sy * dy)**2 - 4*(dx*dx + dy*dy) * (sx*sx + sy*sy - this.MOVELIMIT)))) / 2*(dx*dx + dy*dy);
        console.log(t1)
        //let lastPoint : Pair<number> = new Pair<number>(this._position.position.x + t1*dx, this._position.position.y + t1*dy);
        */
        this.maxPathPoint = lastPoint;

        let endPoint : Vector = new Vector(lastPoint, directionPath);
        
        this._mirage = new Mirage(this, endPoint)

        // push into paths
        this._paths.push(newPath);

        // the possession is for now no one
        this._possession = null;

    }

    /**
     * Gets the current player who has possession of the ball
     * @returns A player instance or null if no one has possession
     */
    public get possession() : Player | null{
        return this._possession;
    }

    /**
     * Sets the player who possesses the ball
     * Disables the player's ability to run while in possession
     * @param player - The player to assign possession to, or null
     */
    public set possession(player : Player | null) {
        this._possession = player;
        // if the player has possession they cant move
        if(player !== null) player.canRun =  false;
    }

    /**
     * Indicates whether the ball is in a state that allows it to be possessed
     * @returns True if the ball can be possessed, false otherwise
     */
    public get canBePossessed() : boolean{
        return this._canBePossessed;
    }

    /**
     * Sets whether the ball can currently be possessed
     * @param canBe - Boolean flag for possession eligibility
     */
    public set canBePossessed(canBe : boolean) {
        this._canBePossessed = canBe;
    }

    /**
     * Checks whether the ball is currently allowed to move
     * @returns True if the ball can move, false if movement is restricted
     */
    public get canMove() : boolean{
        return this._canMove;
    }

    /**
     * Sets whether the ball is allowed to move
     * @param can - Boolean flag indicating move permission
     */
    public set canMove(can : boolean){
        this._canMove = can;
    }

}