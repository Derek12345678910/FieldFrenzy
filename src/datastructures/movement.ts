import { Pair } from "./pair.js";
import { Player } from "../objects/player";

export type Movement = {
  start: Pair<number>;
  end: Pair<number>;
  player: Player;
  radius: number;
  color: string;
  startTime: number;
  duration: number;
};