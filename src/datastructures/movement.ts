import { Pair } from "./pair.js";
import { Player } from "../objects/player";

export type Movement = {
  start: Pair<number> | null;
  end: Pair<number> | null;
  player: Player;
  radius: number;
  color: string;
  startTime: number;
  duration: number;
};