
import { Tool } from "@/components/Canvas";
import { getExistingShapes } from "./http";

type Point = { x: number; y: number };

type RectShape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
  strokeColor: string;
  strokeWidth: number;
};
type CircleShape = {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
  strokeColor: string;
  strokeWidth: number;
};
type PencilShape = {
  type: "pencil";
  points: Point[];
  strokeColor: string;
  strokeWidth: number;
};
type EraserShape = {
  type: "eraser";
  points: Point[];
  strokeWidth: number;
};

type Shape = RectShape | CircleShape | PencilShape | EraserShape;

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private existingShapes: Shape[] = [];
  private roomId: string;
  private socket: WebSocket;

  // drawing state
  private selectedTool: Tool = "circle";
  private currentColor = "#ffffff";
  private currentWidth = 2;
  private currentStroke: PencilShape | EraserShape | null = null;

  // history
  private undoStack: Shape[] = [];
  private redoStack: Shape[] = [];

  // pan/zoom
  private scale = 1;
  private originX = 0;
  private originY = 0;
  private panning = false;
  private panStart: Point = { x: 0, y: 0 };

  // mouse
  private clicked = false;
  private startX = 0;
  private startY = 0;

  constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
  
    this.roomId = roomId;
    this.socket = socket;

    this.init();
    this.initHandlers();
    this.initMouseHandlers();
    this.initKeyHandlers();
    this.initWheelAndPan();
  }

  destroy() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    this.canvas.removeEventListener("mouseup", this.onMouseUp);
    this.canvas.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("mousemove", this.onPanMove);
    window.removeEventListener("mouseup", this.onPanEnd);
    window.removeEventListener("keydown", this.onKeyDown);
  }

  // Public API
  setTool(tool: Tool) {
    this.selectedTool = tool;
  }
  setColor(color: string) {
    this.currentColor = color;
  }
  setStrokeWidth(w: number) {
    this.currentWidth = w;
  }
  undo() {
    if (!this.existingShapes.length) return;
    const shape = this.existingShapes.pop()!;
    this.redoStack.push(shape);
    this.clearCanvas();
  }
  redo() {
    if (!this.redoStack.length) return;
    const shape = this.redoStack.pop()!;
    this.existingShapes.push(shape);
    this.clearCanvas();
  }

  private async init() {
    this.existingShapes = await getExistingShapes(this.roomId);
    this.clearCanvas();
  }

  private initHandlers() {
    this.socket.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "chat") {
        const { shape } = JSON.parse(msg.message);
        this.existingShapes.push(shape);
        this.clearCanvas();
      }
    };
  }

  private clearCanvas() {
    const cw = this.canvas.width;
    const ch = this.canvas.height;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, cw, ch);

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, cw, ch);

  
    this.ctx.setTransform(this.scale, 0, 0, this.scale, this.originX, this.originY);

    this.existingShapes.forEach((s) => this.drawShape(s));
  }

  private drawShape(shape: Shape) {
    
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    if (shape.type === "eraser") {
      this.ctx.save();
      this.ctx.globalCompositeOperation = "destination-out";
      this.ctx.lineWidth = shape.strokeWidth;
      this.ctx.beginPath();
      shape.points.forEach((pt, i) =>
        i === 0 ? this.ctx.moveTo(pt.x, pt.y) : this.ctx.lineTo(pt.x, pt.y)
      );
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    } else {
      this.ctx.globalCompositeOperation = "source-over";
      this.ctx.strokeStyle = shape.strokeColor;
      this.ctx.lineWidth = shape.strokeWidth;

      if (shape.type === "rect") {
        this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        this.ctx.beginPath();
        this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
      } else if (shape.type === "pencil") {
        this.ctx.beginPath();
        shape.points.forEach((pt, i) =>
          i === 0 ? this.ctx.moveTo(pt.x, pt.y) : this.ctx.lineTo(pt.x, pt.y)
        );
        this.ctx.stroke();
        this.ctx.closePath();
      }
    }
  }

  private getMousePos(e: MouseEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left - this.originX) / this.scale,
      y: (e.clientY - rect.top - this.originY) / this.scale,
    };
  }

  private onMouseDown = (e: MouseEvent) => {
    if (this.selectedTool === "hand" || e.button === 1) {
      this.panning = true;
      this.panStart = { x: e.clientX - this.originX, y: e.clientY - this.originY };
      return;
    }

    this.clicked = true;
    const { x, y } = this.getMousePos(e);
    this.startX = x;
    this.startY = y;

    if (this.selectedTool === "pencil") {
      this.currentStroke = {
        type: "pencil",
        points: [{ x, y }],
        strokeColor: this.currentColor,
        strokeWidth: this.currentWidth,
      };
    } else if (this.selectedTool === "eraser") {
      this.currentStroke = {
        type: "eraser",
        points: [{ x, y }],
       
        strokeWidth: this.currentWidth * 10,
      };
    }
  };

  private onMouseMove = (e: MouseEvent) => {
    if (this.panning) return;
    if (!this.clicked && this.selectedTool !== "hand") return;

    const { x, y } = this.getMousePos(e);
    const dx = x - this.startX;
    const dy = y - this.startY;

    this.clearCanvas();

    if (this.selectedTool === "rect") {
      this.drawShape({
        type: "rect",
        x: this.startX,
        y: this.startY,
        width: dx,
        height: dy,
        strokeColor: this.currentColor,
        strokeWidth: this.currentWidth,
      });
    } else if (this.selectedTool === "circle") {
      const r = Math.max(Math.abs(dx), Math.abs(dy)) / 2;
      this.drawShape({
        type: "circle",
        centerX: this.startX + dx / 2,
        centerY: this.startY + dy / 2,
        radius: r,
        strokeColor: this.currentColor,
        strokeWidth: this.currentWidth,
      });
    } else if (this.currentStroke) {
      this.currentStroke.points.push({ x, y });
      this.drawShape(this.currentStroke);
    }
  };

  private onMouseUp = (e: MouseEvent) => {
    if (this.panning) {
      this.panning = false;
      return;
    }
    if (!this.clicked) return;
    this.clicked = false;

    const { x, y } = this.getMousePos(e);
    let finalShape: Shape | null = null;

    if (this.selectedTool === "rect") {
      finalShape = {
        type: "rect",
        x: this.startX,
        y: this.startY,
        width: x - this.startX,
        height: y - this.startY,
        strokeColor: this.currentColor,
        strokeWidth: this.currentWidth,
      };
    } else if (this.selectedTool === "circle") {
      const dx = x - this.startX;
      const dy = y - this.startY;
      finalShape = {
        type: "circle",
        centerX: this.startX + dx / 2,
        centerY: this.startY + dy / 2,
        radius: Math.max(Math.abs(dx), Math.abs(dy)) / 2,
        strokeColor: this.currentColor,
        strokeWidth: this.currentWidth,
      };
    } else {
      finalShape = this.currentStroke;
    }

    if (finalShape) {
      this.existingShapes.push(finalShape);
      this.undoStack.push(finalShape);
      this.redoStack = [];
      this.socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape: finalShape }),
          roomId: this.roomId,
        })
      );
      this.currentStroke = null;
      this.clearCanvas();
    }
  };

  private initMouseHandlers() {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    this.canvas.addEventListener("mouseup", this.onMouseUp);
  }

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const { x, y } = this.getMousePos(e as any as MouseEvent);
    const factor = e.deltaY < 0 ? 1.1 : 0.9;
    this.originX = x - (x - this.originX) * factor;
    this.originY = y - (y - this.originY) * factor;
    this.scale *= factor;
    this.clearCanvas();
  };

  private onPanMove = (e: MouseEvent) => {
    if (!this.panning) return;
    this.originX = e.clientX - this.panStart.x;
    this.originY = e.clientY - this.panStart.y;
    this.clearCanvas();
  };

  private onPanEnd = () => {
    if (this.panning) this.panning = false;
  };

  private initWheelAndPan() {
    this.canvas.addEventListener("wheel", this.onWheel);
    window.addEventListener("mousemove", this.onPanMove);
    window.addEventListener("mouseup", this.onPanEnd);
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "z") {
      e.preventDefault();
      this.undo();
    }
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "y" || (e.shiftKey && e.key === "Z"))
    ) {
      e.preventDefault();
      this.redo();
    }
  };

  private initKeyHandlers() {
    window.addEventListener("keydown", this.onKeyDown);
  }
}
