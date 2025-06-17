import { Pair } from "./pair.js";
import { MovingObject } from "../objects/movingObject.js";

export type Movement = {
  start: Pair<number> | null;
  end: Pair<number> | null;
  obj: MovingObject;
  radius: number;
  color: string;
  startTime: number;
  duration: number;
};