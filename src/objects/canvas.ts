// Imports for game logic and data structures
import { User } from "./user.js";
import { Player } from "./player.js";
import { Team } from "./team.js";

import { List } from "../datastructures/list.js";
import { Pair } from "../datastructures/pair.js";
import { Vector } from "../datastructures/vector.js";
import { Mirage } from "./mirage.js";
import { Ball } from "./ball.js";
import { Battle } from "./battle.js";

import { Movement } from "../datastructures/movement.js";

/**
 * Controls canvas of the game
 */
export class Canvas {
  private _canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private coordDisplay: HTMLElement | null;
  private aspectRatio: number;

  private _height: number;
  private _width: number;

  private battle: Battle;

  public constructor(canvasId: string, battle: Battle) {
    this.battle = battle;
    const el = document.getElementById(canvasId);
    if (!(el instanceof HTMLCanvasElement)) {
      throw new Error(`Element with id "${canvasId}" is not a <canvas>.`);
    }
    this._canvas = el;
    const context = this._canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to get 2D drawing context.');
    }
    this.ctx = context;

    // Locate the coordinate display element
    this.coordDisplay = document.getElementById('coordDisplay');

    // Compute original aspect ratio from initial width/height attributes
    this.aspectRatio = this._canvas.width / this._canvas.height;

    // Resize to fit window on load and attach resize handler
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.resizeCanvas();

    this._height = this._canvas.height;
    this._width = this._canvas.width;
  }

  /**
   * Adjust canvas size to window size while preserving aspect ratio
   */
  public resizeCanvas(): void {
    const { innerWidth } = window;
    const scoreboard = document.getElementById('scoreboard');
    const scoreboardH = scoreboard ? scoreboard.getBoundingClientRect().height : 0;
    const innerHeight = window.innerHeight - scoreboardH;
    const ratio = this.aspectRatio;

    let newWidth: number;
    let newHeight: number;
    if (innerWidth / innerHeight > ratio) {
      newHeight = innerHeight;
      newWidth = Math.floor(newHeight * ratio);
    } else {
      newWidth = innerWidth;
      newHeight = Math.floor(newWidth / ratio);
    }

    this._canvas.width = newWidth;
    this._canvas.height = newHeight;

    this.drawField(); // Redraw field with updated size
  }

  /**
   * Draws the soccer field background and markings
   */
  private drawField(): void {
    const { ctx, _canvas } = this;
    const width = _canvas.width;
    const height = _canvas.height;

    ctx.clearRect(0, 0, width, height); // Clear canvas

    ctx.fillStyle = '#006400'; // Field color
    ctx.fillRect(0, 0, width, height); // Draw field background

    // Center elements
    const centerX = width / 2;
    const centerY = height / 2;
    const centerCircleRadius = Math.min(width, height) * 0.1;

    // Draw center dot
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Draw center circle
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw center line
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Box dimensions
    const penaltyBoxWidth = width * 0.2;
    const penaltyBoxHeight = height * 0.15;
    const sixYardBoxHeight = penaltyBoxHeight * 0.4;
    const sixYardBoxWidth = penaltyBoxWidth * 0.4;

    // Left penalty box
    ctx.strokeRect(
      0,
      (height - penaltyBoxWidth) / 2,
      penaltyBoxHeight,
      penaltyBoxWidth
    );

    // Left six-yard box
    ctx.strokeRect(
      0,
      (height - sixYardBoxWidth) / 2,
      sixYardBoxHeight,
      sixYardBoxWidth
    );

    // Right penalty box
    ctx.strokeRect(
      width - penaltyBoxHeight,
      (height - penaltyBoxWidth) / 2,
      penaltyBoxHeight,
      penaltyBoxWidth
    );

    // Right six-yard box
    ctx.strokeRect(
      width - sixYardBoxHeight,
      (height - sixYardBoxWidth) / 2,
      sixYardBoxHeight,
      sixYardBoxWidth
    );

    // Additional goals or areas can be drawn here
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  /**
   * Draws each player with their future path vectors and destination points
   */
  public drawPlayers(team: Team, color: string, radius: number): void {
    let playersList: List<Player> = team.allPlayers;
    for (let i = 0; i < playersList.size(); i++) {
      let player = playersList.get(i) as Player;

      let posPair: Pair<number> = player.position.position;
      let x: number = posPair.x;
      let y: number = posPair.y;

      let sz: Pair<number> = player.size;
      let r = (sz.x + sz.y) / 2;

      let img: HTMLImageElement = player.image as HTMLImageElement;

      this.drawCircle(x, y, img, r, color); // Draw player

      // Draw movement paths and destinations
      for (let i = player.curPath; i < player.stage + player.curPath; i++) {
        let destination = player.destinations.get(i) as Pair<number>;
        let path = player.paths.get(i) as Vector;

        let mx = destination.x;
        let my = destination.y;

        this.drawCircle(mx, my, img, r, color); // Destination marker

        let sx = path.position.x;
        let sy = path.position.y;
        let dx = path.direction.x;
        let dy = path.direction.y;

        this.drawLine(sx, sy, dx, dy); // Direction arrow
      }
    }
  }

  /**
   * Draw only the current positions of the players without their path
   */
  public drawPlayersReg(team: Team, color: string, radius: number): void {
    let playersList: List<Player> = team.allPlayers;
    for (let i = 0; i < playersList.size(); i++) {
      let player = playersList.get(i) as Player;

      let posPair = player.position.position;
      let x = posPair.x;
      let y = posPair.y;

      let sz = player.size;
      let r = (sz.x + sz.y) / 2;

      let img = player.image as HTMLImageElement;

      this.drawCircle(x, y, img, r, color);
    }
  }

  /**
   * Draw ball without paths
   */
  public drawBallReg(ball: Ball, color: string, radius: number): void {
    let posPair = ball.position.position;
    let x = posPair.x;
    let y = posPair.y;

    let sz = ball.size;
    let r = (sz.x + sz.y) / 2;

    let img = ball.image as HTMLImageElement;

    this.drawCircle(x, y, img, r, color);
  }

  /**
   * Draw the ball with its movement path and future destinations
   */
  public drawBall(ball: Ball, color: string, radius: number): void {
    let posPair = ball.position.position;
    let x = posPair.x;
    let y = posPair.y;

    let sz = ball.size;
    let r = (sz.x + sz.y) / 2;

    let img = ball.image as HTMLImageElement;

    this.drawCircle(x, y, img, r, color);

    for (let i = ball.curPath; i < ball.stage + ball.curPath; i++) {
      let destination = ball.destinations.get(i) as Pair<number>;
      let path = ball.paths.get(i) as Vector;

      let mx = destination.x;
      let my = destination.y;

      this.drawCircle(mx, my, img, r, color);

      let sx = path.position.x;
      let sy = path.position.y;
      let dx = path.direction.x;
      let dy = path.direction.y;

      this.drawLine(sx, sy, dx, dy);
    }
  }

  /**
   * Draw a circle with an image clipped inside and an outline
   */
  private drawCircle(x: number, y: number, img: HTMLImageElement, r: number, color: string): void {
    this.ctx.save(); // Save canvas state

    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.clip(); // Clip image to circle

    this.ctx.drawImage(img, x - r, y - r, r * 2, r * 2); // Draw clipped image

    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke(); // Outline

    this.ctx.restore(); // Restore state
  }

  /**
   * Draws a direction line from (x, y) by offset (dx, dy)
   */
  private drawLine(x: number, y: number, dx: number, dy: number): void {
    let ex = x + dx;
    let ey = y + dy;
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(ex, ey);
    this.ctx.stroke();
  }

  public get height(): number {
    return this._height;
  }

  public get width(): number {
    return this._width;
  }

  /**
   * Clears everything from the canvas
   */
  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this.drawField();
  }

  /**
   * Determines whether a given movement is valid.
   * @param {Movement | null} movement - The movement object to validate.
   * @returns {boolean} True if the movement and its start and end points are not null.
   */
  public isValidMovement(movement: Movement | null): boolean {
    return (movement !== null && movement.start !== null && movement.end !== null);
  }

  /** List of players who have remaining movements to be drawn. */
  private remainingPlayers: List<Pair<Player | User>> = new List<Pair<Player | User>>();

  /**
   * Adds a player and their corresponding user to the list of remaining players.
   * @param {Player} player - The player to be added.
   * @param {User} us - The associated user object.
   */
  public addRemainingPlayer(player: Player, us: User): void {
    let pair: Pair<Player | User> = new Pair<Player | User>(player, us);
    this.remainingPlayers.push(pair);
  }

  /**
   * Draws all players with remaining movements on the canvas.
   */
  private drawRemainingPlayers(): void {
    for (let i = 0; i < this.remainingPlayers.size(); i++) {
      let pair: Pair<Player | User> = this.remainingPlayers.get(i) as Pair<Player | User>;
      let pl: Player = pair.x as Player;
      let user: User = pair.y as User;
      let x: number = pl.position.position.x;
      let y: number = pl.position.position.y;

      if (pl.stopMoving) {
        // Draws a yellow circle for players that stopped moving.
        this.drawCircle(x, y, pl.image, 20, "#FFD700");
      } else {
        this.drawCircle(x, y, pl.image, 20, user.colour);
      }
    }
  }

  /** Indicates whether an animation is currently running. */
  private isAnimating: boolean = false;

  /** Queue of movement pairs to animate (two stages per object). */
  private activeMovements: List<Pair<Movement | null>> = new List<Pair<Movement | null>>();

  /** Tracks the stage of each movement in activeMovements (0, 1, or 2). */
  private complete: List<number> = new List<number>();

  /** Counter for completed animations. */
  private animscomplete: number = 0;

  /**
   * Starts animating a pair of movements for an object.
   * @param {Movement | null} movement1 - The first stage of the movement.
   * @param {Movement | null} movement2 - The second stage of the movement.
   */
  public animateMovement(movement1: Movement | null, movement2: Movement | null): void {
    let movement: Pair<Movement | null> = new Pair(movement1, movement2);
    this.activeMovements.push(movement);
    this.complete.push(1); // Begin with the first stage

    // Start the animation loop if not already animating
    if (!this.isAnimating) {
      this.isAnimating = true;
      requestAnimationFrame(this.animateAll);
    }
  }

  /**
   * Animates all queued movements frame by frame using requestAnimationFrame.
   * Handles two-stage movement, drawing, and final cleanup.
   */
  private animateAll = () => {
    const now: number = performance.now();

    this.clearCanvas();
    this.battle.checkHits();
    this.drawRemainingPlayers();

    let canMove: boolean = true;

    for (let i = 0; i < this.activeMovements.size(); i++) {
      let movementPair: Pair<Movement | null> = this.activeMovements.get(i) as Pair<Movement | null>;
      let stage: number = this.complete.get(i) as number;

      canMove = true;

      // First movement stage
      if (movementPair.x !== null && (stage === 1 || stage === 0)) {
        let { start, end, obj, radius, color, startTime, duration } = movementPair.x;

        if (obj.stopMoving) {
          if (this.complete.get(i) !== 0) {
            this.complete.insert(0, i);
            this.animscomplete++;
          }
          this.drawCircle(obj.movementPosition.x, obj.movementPosition.y, obj.image, radius, "#FFD700");
          canMove = false;
        }

        if (start && end && canMove) {
          let progress = Math.min((now - startTime) / duration, 1);
          let x = start.x + (end.x - start.x) * progress;
          let y = start.y + (end.y - start.y) * progress;

          obj.movementPosition.x = x;
          obj.movementPosition.y = y;

          this.drawCircle(x, y, obj.image, radius, color);

          if (progress >= 1) {
            if (this.isValidMovement(movementPair.y) && movementPair.y !== null) {
              movementPair.y.startTime = now;
              this.complete.insert(2, i);
            } else {
              this.animscomplete++;
            }
          }
        }
      }
      // Second movement stage
      else if (this.isValidMovement(movementPair.y) && movementPair.y !== null && (stage === 2 || stage === 0)) {
        let { start, end, obj, radius, color, startTime, duration } = movementPair.y;

        if (obj.stopMoving) {
          if (this.complete.get(i) !== 0) {
            this.complete.insert(0, i);
            this.animscomplete++;
          }
          this.drawCircle(obj.movementPosition.x, obj.movementPosition.y, obj.image, radius, "#FFD700");
          canMove = false;
        }

        if (start && end && canMove) {
          let progress = Math.min((now - startTime) / duration, 1);
          let x = start.x + (end.x - start.x) * progress;
          let y = start.y + (end.y - start.y) * progress;

          obj.movementPosition.x = x;
          obj.movementPosition.y = y;

          this.drawCircle(x, y, obj.image, radius, color);

          if (progress >= 1) {
            this.animscomplete++;
          }
        }
      }
    }

    // Continue animation loop if not finished
    if (this.animscomplete !== this.activeMovements.size()) {
      requestAnimationFrame(this.animateAll);
    } else {
      // Animation complete: reset everything
      this.isAnimating = false;
      this.battle.resetField();
      this.activeMovements.empty();
      this.complete.empty();
      this.remainingPlayers.empty();
      this.animscomplete = 0;
    }
  };
}