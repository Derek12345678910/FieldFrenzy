import { Ability } from "./ability.js";

/**
 * An ability related to shooting
 */
export class Shooting extends Ability {

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(name : string, discription : string, passive : boolean){
        super(name, discription, passive);
    }

    public override ability(): void {
        
    }
}

/**
 * An ability related to hitboxes
 */
export class Hitbox extends Ability {

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(name : string, discription : string, passive : boolean){
        super(name, discription, passive);
    }

    public override ability(): void {
        
    }
}

/**
 * An ability that is related to passing
 */
export class Passing extends Ability {

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(name : string, discription : string, passive : boolean){
        super(name, discription, passive);
    }

    public override ability(): void {
        
    }
}

/**
 * An ability that is related to functonality
 */
export class Functionality extends Ability {

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(name : string, discription : string, passive : boolean){
        super(name, discription, passive);
    }

    public override ability(): void {
        
    }
}

/**
 * An ability that is related to Unique
 */
export class Unique extends Ability {

    /**
     * Creates an ability
     * @param name name of the ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(name : string, discription : string, passive : boolean){
        super(name, discription, passive);
    }

    public override ability(): void {
        
    }
}