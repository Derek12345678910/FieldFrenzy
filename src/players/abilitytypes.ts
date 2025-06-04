import { Ability } from "./ability.js";

/**
 * An ability related to shooting
 */
export class Shooting extends Ability {

    /**
     * Creates an ability
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(discription : string, passive : boolean){
        super(discription, passive);
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
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(discription : string, passive : boolean){
        super(discription, passive);
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
     * @param discription description of the ability
     * @param passive whether or not the ability is a passive
     */
    protected constructor(discription : string, passive : boolean){
        super(discription, passive);
    }

    public override ability(): void {
        
    }
}