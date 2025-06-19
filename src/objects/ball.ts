import { Vector } from "../datastructures/vector.js";
import { MovingObject } from "./movingObject.js";
import { Player } from "./player.js";
import { Mirage } from "./mirage.js";
import { Team } from "./team.js";

import { Pair } from "../datastructures/pair.js";
import { Canvas } from "./canvas.js";

export class Ball extends MovingObject{

    private _possession : Player | null;

    protected _object : MovingObject = this;

    /** Final point */
    protected maxPathPoint : Pair<number> | null; // is the last point on the path

    private _canBePossessed : boolean; // checks if the ball is able to possessed

    /** Controls whether the ball can move */
    private _canMove : boolean = true;

    public constructor(hitbox : Pair<number>, size : Pair<number>, image : string){
        super(hitbox, size, image)
    }

    public fullReset() : void{
        this.maxPathPoint = null;
        this.reset();
    }

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
     * Used to check if the ball is inside of the net 
     * @param canvas Game canvas
     * @returns the team number that the ball is in or 3 if its not in a net
     */
    public isTouchingNet(canvas: Canvas): number {
    // width of the net (vertical on canvas)
    let netWidth = (canvas.height - canvas.width * 0.08) / 2;
    
    // min y coordinate of the ball for it to be in the net
    let minWidth = Math.ceil((canvas.height - netWidth) / 2);
    
    // max y coordinate of the ball for the ball to be in the net
    let maxWidth = Math.floor(minWidth + netWidth);

    // Check if the ball is within the vertical net range
    let inNetVertically = this._movementPosition.y >= minWidth && this._movementPosition.y <= maxWidth;

    if (inNetVertically) {
        // Check if touching the left edge (Team 1's net)
        if ((this._movementPosition.x - this.hitbox.x) <= 0) {
            return 1;
        }
        // Check if touching the right edge (Team 2's net)
        if ((this._movementPosition.x + this.hitbox.x) >= canvas.width) {
            return 2;
        }
    }

    // Not in either net
    return 3;
}

    public get possession() : Player | null{
        return this._possession;
    }

    public set possession(player : Player | null) {
        this._possession = player;
        // if the player has possession they cant move
        if(player !== null) player.canRun =  false;
    }

    public get canBePossessed() : boolean{
        return this._canBePossessed;
    }

    public set canBePossessed(canBe : boolean) {
        this._canBePossessed = canBe;
    }

    public get canMove() : boolean{
        return this._canMove;
    }

    public set canMove(can : boolean){
        this._canMove = can;
    }

}