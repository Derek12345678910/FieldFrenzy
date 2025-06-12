import { MovingObject } from "./movingObject.js";
import { Ability } from "../players/ability.js";

import { Vector } from "../datastructures/vector.js"
import { Pair } from "../datastructures/pair.js";
import { List } from "../datastructures/list.js";

import { Ball } from "./ball.js";
import { Mirage } from "./mirage.js";

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
     * (Startpoint, direction)
     */
    protected _path : Vector | null;

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

    public calculatePath(x : number, y : number): Vector {
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

    public getPointOnPath(scalerMutiple : number) : Pair<number> | null{
        if(this._path !== null){
            let coord : Pair<number> = new Pair<number>(this._position.position.x + this._path.direction.x * scalerMutiple, this._position.position.y + this._path.direction.y * scalerMutiple);
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
        return (mouseX >= this._position.position.x && mouseX <= this._position.position.x + this._size.x && mouseY >= this._position.position.y && mouseY <= this._position.position.y + this._size.y);
    }

    public displayOptions(): void{
        Player.container.innerHTML = ''
        let options: string[] = ["Shoot", "Move", "Ability"];
        for(let i=0;i<options.length;i++){
            let button = document.createElement("button");
            button.innerText = options[i];
            button.className = "option-button";
            button.addEventListener("click", ()=>{
                console.log(`Action: ${options[i]}`)
            });
            Player.container.appendChild(button);
        }
    }
}