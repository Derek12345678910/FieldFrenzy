import { User } from "./user.js";
import { Player } from "./player.js";
import { Team } from "./team.js";

import { List } from "../datastructures/list.js";
import { Pair } from "../datastructures/pair.js";
import { Vector } from "../datastructures/vector.js";
import { Mirage } from "./mirage.js";
import { Ball } from "./ball.js";

/**
 * Controls canvas of the game
 */
export class Canvas {
  private _canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private coordDisplay: HTMLElement | null;
  private aspectRatio: number;

  private _height : number;
  private _width : number;

  public constructor(canvasId: string) {
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

  public resizeCanvas(): void {
    const { innerWidth } = window;
    // Subtract scoreboard height (if present) so canvas fits without scrolling
    const scoreboard = document.getElementById('scoreboard');
    const scoreboardH = scoreboard ? scoreboard.getBoundingClientRect().height : 0;
    const innerHeight = window.innerHeight - scoreboardH;
    const ratio = this.aspectRatio;

    // Determine the maximum dimensions that fit the window while preserving aspect ratio
    let newWidth: number;
    let newHeight: number;
    if (innerWidth / innerHeight > ratio) {
      newHeight = innerHeight;
      newWidth = Math.floor(newHeight * ratio);
    } else {
      newWidth = innerWidth;
      newHeight = Math.floor(newWidth / ratio);
    }

    // Update canvas dimensions
    this._canvas.width = newWidth;
    this._canvas.height = newHeight;

    // Redraw field
    this.drawField();
  }

  private drawField(): void {
    const { ctx, _canvas } = this;
    const width = _canvas.width;
    const height = _canvas.height;

    // Clear any previous drawing
    ctx.clearRect(0, 0, width, height);

    // Draw green field background
    ctx.fillStyle = '#006400'; // dark green
    ctx.fillRect(0, 0, width, height);

    // Center circle and center line
    const centerX = width / 2;
    const centerY = height / 2;
    const centerCircleRadius = Math.min(width, height) * 0.1;
    // Center dot (small white filled circle)
    ctx.beginPath();
    ctx.fillStyle = '#FFFFFF';
    ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Center circle (white outline)
    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.arc(centerX, centerY, centerCircleRadius, 0, 2 * Math.PI);
    ctx.stroke();

    // Center line
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    // Define penalty and six-yard box dimensions
    const penaltyBoxWidth = width * 0.2;
    const penaltyBoxHeight = height * 0.15;
    const sixYardBoxHeight = penaltyBoxHeight * 0.4;
    const sixYardBoxWidth = penaltyBoxWidth * 0.4;

    console.log(width);
    console.log(sixYardBoxWidth);
    console.log(height);
    // Left big penalty box
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.strokeRect(
      0,
      (height - penaltyBoxWidth) / 2,
      penaltyBoxHeight,
      penaltyBoxWidth
    );
    // Left small penalty box
    ctx.strokeRect(
      0,
      (height - sixYardBoxWidth) / 2,
      sixYardBoxHeight,
      sixYardBoxWidth
    );
    // Right big penalty box
    ctx.strokeRect(
      width - penaltyBoxHeight,
      (height - penaltyBoxWidth) / 2,
      penaltyBoxHeight,
      penaltyBoxWidth
    );
    // Right small penalty box
    ctx.strokeRect(
      width - sixYardBoxHeight,
      (height - sixYardBoxWidth) / 2,
      sixYardBoxHeight,
      sixYardBoxWidth
    );

    // Draw penalty areas and goals for top and bottom halves
    

  }

  public get canvas() : HTMLCanvasElement{
    return this._canvas;
  }

  /**
   * Draws each Player in the provided list as a circle with a direction arrow.
   * @param playersList List<Player> to render.
   * @param color   The fill color for the player's circle (e.g. "#FF0000").
   * @param radius  Radius of the circle in pixels (default = 10).
   */
  public drawPlayers(team : Team, color: string, radius: number): void {
    let playersList : List<Player> = team.allPlayers;
    for (let i = 0; i < playersList.size(); i++) {
      let player = playersList.get(i) as Player;

      let posPair: Pair<number> = player.position.position;
      let x: number = posPair.x; let y: number = posPair.y;

      let r = radius;
      let sz: Pair<number> = player.size;
      r = (sz.x + sz.y) / 2;

      let img: HTMLImageElement = player.image as HTMLImageElement;

      this.drawCircle(x, y, img, r, color);

      // draw the paths of the character
      for(let i=0; i<player.stage; i++){
        let destination : Pair<number> = player.destinations.get(i) as Pair<number>;
        
        let path : Vector = player.paths.get(i) as Vector

        let mx : number = destination.x;
        let my : number = destination.y;

        this.drawCircle(mx, my, img, r, color);

        let start : Pair<number> = path.position;
        let dir : Pair<number> = path.direction;

        let sx : number = start.x; let sy : number = start.y;
        let dx : number = dir.x; let dy : number = dir.y;

        this.drawLine(sx, sy, dx, dy);

      }
    }
  }

  public drawPlayersReg(team : Team, color: string, radius: number): void {
    let playersList : List<Player> = team.allPlayers;
    for (let i = 0; i < playersList.size(); i++) {
      let player = playersList.get(i) as Player;

      let posPair: Pair<number> = player.position.position;
      let x: number = posPair.x; let y: number = posPair.y;

      let r = radius;
      let sz: Pair<number> = player.size;
      r = (sz.x + sz.y) / 2;

      let img: HTMLImageElement = player.image as HTMLImageElement;

      this.drawCircle(x, y, img, r, color);
    }
  }

  public drawBallReg(ball : Ball, color: string, radius: number){

    let posPair: Pair<number> = ball.position.position;
    let x: number = posPair.x; let y: number = posPair.y;

    let r = radius;
    let sz: Pair<number> = ball.size;
    r = (sz.x + sz.y) / 2;

    let img: HTMLImageElement = ball.image as HTMLImageElement;

    this.drawCircle(x, y, img, r, color);
  }

  /**
   * Draws the ball on the field
   * @param ball ball object to draw
   * @param color colour of the team in possesion
   * @param radius radius of the circle in pixels
   */
  public drawBall(ball : Ball, color: string, radius: number){

    let posPair: Pair<number> = ball.position.position;
    let x: number = posPair.x; let y: number = posPair.y;

    let r = radius;
    let sz: Pair<number> = ball.size;
    r = (sz.x + sz.y) / 2;

    let img: HTMLImageElement = ball.image as HTMLImageElement;

    this.drawCircle(x, y, img, r, color);

    for(let i=0; i<ball.stage; i++){
      let destination : Pair<number> = ball.destinations.get(i) as Pair<number>;
      
      let path : Vector = ball.paths.get(i) as Vector

      let mx : number = destination.x;
      let my : number = destination.y;

      this.drawCircle(mx, my, img, r, color);

      let start : Pair<number> = path.position;
      let dir : Pair<number> = path.direction;

      let sx : number = start.x; let sy : number = start.y;
      let dx : number = dir.x; let dy : number = dir.y;

      this.drawLine(sx, sy, dx, dy);

    }
  }

  private drawCircle(x : number, y : number, img : HTMLImageElement, r : number, color : string) : void{

    this.ctx.save(); // Save current canvas state

    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.clip();

    this.ctx.drawImage(img, x - r, y - r, r * 2, r * 2);

    // === Draw circular border ===
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.restore(); // Restore to remove clipping

  }

  private drawLine(x : number, y : number, dx : number, dy : number){
    let ex = x + dx
    let ey = y + dy
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(ex, ey);
    this.ctx.stroke();
  }

  public get height() : number{
    return this._height;
  }

  public get width() : number{
    return this._width;
  }

  /**
   * Clear the canvas of drawing
   */
  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

    this.drawField();
}


}