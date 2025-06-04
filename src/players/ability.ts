/**
 * An ability class that is created everytime an ability is used
 */
export abstract class Ability {

    protected _name : string;
    
    protected _description : string;

    protected _isPassive : boolean;

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(name : string, discription : string, passive : boolean){
        this._name = name;
        this._description = discription;
        this._isPassive = passive;
    }

    public get name() : string{
        return this._name;
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