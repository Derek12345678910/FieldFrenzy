/**
 * An ability class that is created everytime an ability is used
 */
export abstract class Ability {

    protected _name : string;
    
    protected _description : string;

    protected _isPassive : boolean;

    protected _cooldown : number;

    protected _curcd : number = 0;

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     * @param cooldown amount of time it takes for cooldown
     */
    protected constructor(name : string, discription : string, passive : boolean, cooldown : number){
        this._name = name;
        this._description = discription;
        this._isPassive = passive;
    }

    public get name() : string{
        return this._name;
    }

    public get cooldown(): number{
        return this._cooldown;
    }

    public get curcd(): number{
        return this._curcd;
    }

    public set curcd(cd : number){
        this._curcd = cd;
    }

    /**
     * @returns returns the description of the ability
     */
    public get description() : string{
        return this._description;
    }

    /**
     * @returns returns the whether or not the ability is a passive
     */
    public get isPassive() : boolean{
        return this._isPassive;
    }

    /**
     * Use the ability
     */
    public abstract ability() : void

}