import { Pair } from "./pair.js";
import { MovingObject } from "../objects/movingObject.js";

/**
 * Represents a movement event in the game or simulation
 * Contains data about the player's movement from a starting
 * point to an ending point over a period of time, with visual styling
 */
export type Movement = {
  start: Pair<number> | null;
  end: Pair<number> | null;
  obj: MovingObject;
  radius: number;
  color: string;
  startTime: number;
  duration: number;
};