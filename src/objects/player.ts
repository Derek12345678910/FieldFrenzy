import { MovingObject } from "./movingObject.js";
import { Ability } from "../players/ability.js";

import { Vector } from "../datastructures/vector.js"
import { Pair } from "../datastructures/pair.js";
import { List } from "../datastructures/list.js";

import { Ball } from "./ball.js";
import { Mirage } from "./mirage.js";
import { Battle } from "./battle.js";
import { User } from "./user.js";

export class Player extends MovingObject {

    /** Where the option buttons (Shoot/Move/Ability) will be rendered */
    static container: HTMLElement = document.getElementById("optionButtons") as HTMLElement;

    private static card = document.getElementById('playerCard') as HTMLElement;
    private static elName = document.getElementById('pcName') as HTMLElement;
    private static elImage = document.getElementById('pcImage') as HTMLImageElement;
    private static elPower = document.getElementById('pcPower') as HTMLElement;
    private static elSpeed = document.getElementById('pcSpeed') as HTMLElement;
    private static elSize = document.getElementById('pcSize') as HTMLElement;
    private static elHitbox = document.getElementById('pcHitbox') as HTMLElement;
    private static elAbilityName = document.getElementById('pcAbilityName') as HTMLElement;
    private static elAbilityDesc = document.getElementById('pcAbilityDesc') as HTMLElement;
    private static closeBtn = document.getElementById('pcClose') as HTMLButtonElement;
    private static _selected : boolean = false;

    protected _object : MovingObject = this;
    
    protected _field_position: string;

    protected _name : string;

    protected _power : number;

    protected _speed : number;

    protected _ability : Ability;

    /** Action */
    protected _move : string;

    protected _ball : Ball; 

    /** is the stage for shots because we don't want player to take 2 shots and 2 moves */
    protected _shotStage : number = 0;

    /** Final point */
    protected maxPathPoint : Pair<number> | null; // is the last point on the path

    /** Can do an action */
    protected _canMove : boolean = true;

    protected _canRun : boolean = true;

    protected constructor(name : string, hitbox : Pair<number>, size : Pair<number>, image : string, power : number, speed : number, ability : Ability){
        super(hitbox, size, image);
        this._name = name;
        this._power = power;
        this._speed = speed;
        this._ability = ability;
    }

    /**
     * Fully reset
     */
    public fullReset() : void{
        this._shotStage = 0;
        this.maxPathPoint = null;
        this._canMove = true;
        this._canRun = true;
        this.reset();
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

        Player.selected = true;

        Player.container.innerHTML = ''
        let options : List<string> = new List<string>();
        if(this._canRun) options.push("Move");
        if(this._ball.possession === this) options.push("Shoot");
        options.push("Ability");
        for(let i=0;i<options.size();i++){
            let button = document.createElement("button");
            let type : string = options.get(i) as string;
            button.innerText = type;
            button.className = "option-button";
            button.addEventListener("click", ()=>{
                console.log(`Action: ${type}`)
                this._move = type;
                battle.actionPhase = 2;
            });
            Player.container.appendChild(button);
        }

        let drag = false;
        let offsetX = 0;
        let offsetY = 0;

        Player.card.addEventListener('mousedown', (e: MouseEvent) => {
            drag = true;
            Player.card.classList.add('dragging');
            if (Player.card.style.right) {  // convert to left/top on first drag
            Player.card.style.left = `${Player.card.offsetLeft}px`;
            Player.card.style.right = '';
            }
            offsetX = e.clientX - Player.card.offsetLeft;
            offsetY = e.clientY - Player.card.offsetTop;
            e.preventDefault();
        });
        window.addEventListener('mousemove', (e: MouseEvent) => {
            if (!drag) return;
            Player.card.style.left = `${e.clientX - offsetX}px`;
            Player.card.style.top  = `${e.clientY - offsetY}px`;
        });
        window.addEventListener('mouseup', () => {
            if (drag) {
            drag = false;
            Player.card.classList.remove('dragging');
            }
        });

        Player.elName.textContent = this.name;
        Player.elImage.src = this.image.src;
        Player.elPower.textContent = String(this.power);
        Player.elSpeed.textContent = String(this.speed);
        Player.elSize.textContent = `${this.size.x} × ${this.size.y}`;
        Player.elHitbox.textContent = `${this._hitbox?.x ?? ''} × ${this._hitbox?.y ?? ''}`;
        Player.elAbilityName.textContent = this._ability?.name ?? '';
        Player.elAbilityDesc.textContent = this._ability?.description ?? '';
        Player.card.style.display = 'block';

    }

    public static  hideOptions() : void{
        Player.card.style.display = 'none';
        Player._selected = false;
    }

    /** Closes the playercard */
    static {
        if (Player.closeBtn) {
            Player.closeBtn.addEventListener('click', () => {
                Player.card.style.display = 'none';
                Player._selected = false;
            });
        }
    }

    /**
     * Checks if the ball is within the player's hitbox
     */
    public touchingBall(): boolean{
        let hitboxRight: number = this.movementPosition.x+(this.hitbox.x/2);
        let hitboxLeft: number = this.movementPosition.x-(this.hitbox.x/2);
        let hitboxTop: number = this.movementPosition.y+(this.hitbox.y/2);
        let hitboxBottom: number = this.movementPosition.y-(this.hitbox.y/2);
        let ballPositionX: number = this.ball.movementPosition.x;
        let ballPositionY: number = this.ball.movementPosition.y;
        let ballRadius: number = (this.ball.hitbox.x/2);
        if((ballPositionX+ballRadius>=hitboxLeft) && (ballPositionX-ballRadius)<=hitboxRight && (ballPositionY+ballRadius)>=hitboxBottom && (ballPositionY-ballRadius)<=hitboxTop){
            if(this.ball.canBePossessed){
                return true;
            }
            else return false;
        }
        else{
            return false;
        }
    }

    public touchingBallStage(): boolean{
        let curPos : Pair<number> = (this._stage === 0) ? this._position.position : this._destinations.get(this._curPath + this._stage - 1) as Pair<number>;
        let ballPos : Pair<number> = (this._ball.stage === 0) ? this._ball.position.position : this._ball.destinations.get(this._ball.curPath + this._ball.stage - 1) as Pair<number>;
        let hitboxRight: number = curPos.x+(this.hitbox.x/2);
        let hitboxLeft: number = curPos.x-(this.hitbox.x/2);
        let hitboxTop: number = curPos.y+(this.hitbox.y/2);
        let hitboxBottom: number = curPos.y-(this.hitbox.y/2);
        let ballPositionX: number = ballPos.x;
        let ballPositionY: number = ballPos.y;
        let ballRadius: number = (this.ball.hitbox.x/2);
        if((ballPositionX+ballRadius>=hitboxLeft) && (ballPositionX-ballRadius)<=hitboxRight && (ballPositionY+ballRadius)>=hitboxBottom && (ballPositionY-ballRadius)<=hitboxTop){
            return true;
        }
        return false;
    }

    /**
     * Determines if the player can perform an action.
     * @returns {boolean} `true` if the player can act; otherwise, `false`.
     */
    public canAct(): boolean {
        if (this._ball.possession === this) {
            if (this._ball.stage === 2) {
                return false;
            }
        }

        if (this._stage + this._shotStage === 2) {
            return false;
        }

        if (!this._canMove) {
            return false;
        }

        return true;
    }

    /**
     * Gets the power level of the player.
     * @returns The player's power.
     */
    public get power(): number {
    return this._power;
    }

    /**
     * Gets the speed level of the player.
     * @returns The player's speed.
     */
    public get speed(): number {
    return this._speed;
    }

    /**
     * Gets the name of the player.
     * @returns The player's name.
     */
    public get name(): string {
    return this._name;
    }

    /**
     * Gets the ball currently associated with the player.
     * @returns The ball.
     */
    public get ball(): Ball {
    return this._ball;
    }

    /**
     * Sets the ball associated with the player.
     * @param ball - The new ball object.
     */
    public set ball(ball: Ball) {
    this._ball = ball;
    }

    /**
     * Gets the underlying moving object representing the player.
     * @returns The moving object.
     */
    public get object(): MovingObject {
    return this._object;
    }

    /**
     * Gets the move type or name associated with the player.
     * @returns The move.
     */
    public get move(): string {
    return this._move;
    }

    /**
     * Sets the move type or name for the player.
     * @param move - The move.
     */
    public set move(move: string) {
    this._move = move;
    }

    /**
     * Gets whether the player can move.
     * @returns`true` if the player can move; otherwise, `false`.
     */
    public get canMove(): boolean {
    return this._canMove;
    }

    /**
     * Sets the ability of the player to move.
     * @param can - Whether the player can move.
     */
    public set canMove(can: boolean) {
    this._canMove = can;
    }

    /**
     * Gets whether the player can run.
     * @returns `true` if the player can run; otherwise, `false`.
     */
    public get canRun(): boolean {
    return this._canRun;
    }

    /**
     * Sets the ability of the player to run.
     * @param can - Whether the player can run.
     */
    public set canRun(can: boolean) {
    this._canRun = can;
    }

    /**
     * Gets the current shot stage of the player.
     * @returns The shot stage.
     */
    public get shotStage(): number {
    return this._shotStage;
    }

    /**
     * Sets the shot stage for the player.
     * @param stage - The new shot stage.
     */
    public set shotStage(stage: number) {
    this._shotStage = stage;
    }

    /**
     * Gets whether a player is currently selected.
     * @returns `true` if selected; otherwise, `false`.
     */
    public static get selected(): boolean {
    return Player._selected;
    }

    /**
     * Sets whether a player is selected.
     * @param selected - Whether the player is selected.
     */
    public static set selected(selected: boolean) {
    Player._selected = selected;
    }

    public get field_position() : string{
        return this._field_position;
    }

}