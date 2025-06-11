import { MovingObject } from "./movingObject.js";
import { Ability } from "../players/ability.js";

import { Vector } from "../datastructures/vector.js"
import { Pair } from "../datastructures/pair.js";

export class Player extends MovingObject {
    static container: HTMLElement = document.getElementById("optionDisplay") as HTMLElement;
    protected _name : string;

    protected _power : number;

    protected _speed : number;

    protected _ability : Ability;

    protected constructor(hitbox : Pair<number>, size : Pair<number>, image : string, power : number, speed : number, ability : Ability){
        super(hitbox, size, image);
        this._power = power;
        this._speed = speed;
        this._ability = ability;
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

    public calculateNewVector(x : number, y : number): Vector {
        let coord : Pair<number> = new Pair<number>(x, y);
        
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