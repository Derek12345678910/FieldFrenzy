import { MovingObject } from "./movingObject.js";
import { Ability } from "../players/ability.js";

import { Vector } from "../datastructures/vector.js"
import { Pair } from "../datastructures/pair.js";
import { List } from "../datastructures/list.js";

import { Ball } from "./ball.js";
import { Mirage } from "./mirage.js";
import { Battle } from "./battle.js";
import { dir } from "console";

export class Player extends MovingObject {
    
    static container: HTMLElement = document.getElementById("optionDisplay") as HTMLElement;

    protected _object : MovingObject = this;

    protected _name : string;

    protected _power : number;

    protected _speed : number;

    protected _ability : Ability;

    // holds the move the player is about to do
    protected _move : string;

    // pointer to ball
    protected _ball : Ball; 

    /**
     * Final point
     */
    protected maxPathPoint : Pair<number> | null; // is the last point on the path

    private MOVELIMIT : number = 20; // 20 units move limit

    protected constructor(hitbox : Pair<number>, size : Pair<number>, image : string, power : number, speed : number, ability : Ability){
        super(hitbox, size, image);
        this._power = power;
        this._speed = speed;
        this._ability = ability;
    }

    public calculatePath(x : number, y : number) : void {

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

    }

    public getPointOnPath(scalerMutiple : number) : Pair<number> | null{
        let path : Vector = this._paths.get(this._curPath) as Vector;
        if(this._paths.get(this._curPath) !== null){
            let coord : Pair<number> = new Pair<number>(this._position.position.x + path.direction.x * scalerMutiple, this._position.position.y + path.direction.y * scalerMutiple);
            this._position.position = coord;
            return coord;
        }
        return null;
    }

    public get power() : number {
        return this._power;
    }

    public get speed() : number {
        return this._speed;
    }

    public get name() : string{
        return this._name;
    }

    public get ball() : Ball{
        return this._ball;
    }
    
    public set ball(ball : Ball){
        this._ball = ball;
    }

    public get object() : MovingObject{
        return this._object;
    }

    public get move() : string{
        return this._move;
    }

    public set move(move : string){
        this._move = move;
    }

    public isClicked(mouseX: number, mouseY: number): boolean {
    /*
    console.log("mouseX:", mouseX);
    console.log("mouseY:", mouseY);

    console.log("this._position.position.x:", this._position.position.x);
    console.log("this._position.position.y:", this._position.position.y);
    console.log("this._size.x:", this._size.x);
    console.log("this._size.y:", this._size.y);

    console.log("mouseX >= this._position.position.x:", mouseX >= this._position.position.x);
    console.log("mouseX <= this._position.position.x + this._size.x:", mouseX <= this._position.position.x + this._size.x);
    console.log("mouseY >= this._position.position.y:", mouseY >= this._position.position.y);
    console.log("mouseY <= this._position.position.y + this._size.y:", mouseY <= this._position.position.y + this._size.y);
    */
        let left: number = this._position.position.x - (this.size.x)
        let right: number = this._position.position.x + (this.size.x)
        let top: number = this._position.position.y - (this.size.y)
        let bottom: number = this._position.position.y + (this.size.y);
        return (mouseX >= left && mouseX <= right && mouseY >= top && mouseY <= bottom);
    }

    public displayOptions(battle : Battle): void{
        Player.container.innerHTML = ''
        let options: string[] = ["Shoot", "Move", "Ability"];
        for(let i=0;i<options.length;i++){
            let button = document.createElement("button");
            button.innerText = options[i];
            button.className = "option-button";
            button.addEventListener("click", ()=>{
                console.log(`Action: ${options[i]}`)
                battle.actionPhase = 2;
            });
            Player.container.appendChild(button);
        }
    }

    /**
     * Checks if the ball is within the player's hitbox
     */
    public touchingBall(): boolean{
        let hitboxRight: number = this.position.position.x+(this.hitbox.x/2);
        let hitboxLeft: number = this.position.position.x-(this.hitbox.x/2);
        let hitboxTop: number = this.position.position.y+(this.hitbox.y/2);
        let hitboxBottom: number = this.position.position.y-(this.hitbox.y/2);
        let ballPositionX: number = this.ball.position.position.x;
        let ballPositionY: number = this.ball.position.position.y;
        let ballRadius: number = (this.ball.hitbox.x/2);
        if((ballPositionX+ballRadius>=hitboxLeft) && (ballPositionX-ballRadius)<=hitboxRight && (ballPositionY+ballRadius)>=hitboxBottom && (ballPositionY-ballRadius)<=hitboxTop){
            return true;
        }
        else{
            return false;
        }
    }

}