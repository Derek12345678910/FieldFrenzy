import { User } from "./user.js";
import { Player } from "./player.js";
import { Team } from "./team.js";

import { List } from "../datastructures/list.js";
import { Pair } from "../datastructures/pair.js";

/**
 * Controls canvas of the game
 */
export class Canvas {
  private _canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private coordDisplay: HTMLElement | null;
  private aspectRatio: number;

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

  }

  public resizeCanvas(): void {
    const { innerWidth, innerHeight } = window;
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
   * @param lineLen Length of the direction line (default = 20).
   */
  public drawPlayers(team : Team, color: string, radius: number, lineLen: number): void {
    let playersList : List<Player> = team.allPlayers;
    for (let i = 0; i < playersList.size(); i++) {
      let player = playersList.get(i) as Player;

    let posPair: Pair<number> = player.position.position;
    let dirPair: Pair<number> = player.position.direction;
    let x: number = posPair.x;
    let y: number = posPair.y;
    let dx: number = dirPair.x;
    let dy: number = dirPair.y;

    let r = radius;
    let sz: Pair<number> = player.size;
    r = (sz.x + sz.y) / 2;

    let img: HTMLImageElement = player.image as HTMLImageElement;

    // === Draw circular image ===
    this.ctx.save(); // Save current canvas state

    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.clip();

    this.ctx.drawImage(img, x - r, y - r, r * 2, r * 2);

    this.ctx.restore(); // Restore to remove clipping

    // === Draw circular border ===
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // === Draw direction line ===
    const ex = x + dx * lineLen;
    const ey = y + dy * lineLen;
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(ex, ey);
    this.ctx.stroke();

    // === Draw arrowhead ===
    const ahLen = 6;
    const ahWidth = 4;
    const bx = ex - dx * ahLen;
    const by = ey - dy * ahLen;
    const px = -dy;
    const py = dx;
    const leftX = bx + px * ahWidth;
    const leftY = by + py * ahWidth;
    const rightX = bx - px * ahWidth;
    const rightY = by - py * ahWidth;

    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.beginPath();
    this.ctx.moveTo(ex, ey);
    this.ctx.lineTo(leftX, leftY);
    this.ctx.lineTo(rightX, rightY);
    this.ctx.closePath();
    this.ctx.fill();
}
}
}