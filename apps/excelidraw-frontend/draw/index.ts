
import { HTTP_BACKEND } from "@/config";
import axios from "axios";

type Point = { x: number; y: number };


type RectShape = {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
};
type CircleShape = {
  type: "circle";
  centerX: number;
  centerY: number;
  radius: number;
};
type PencilShape = {
  type: "pencil";
  points: Point[];       
  strokeColor: string;
  strokeWidth: number;
};

type Shape = RectShape | CircleShape | PencilShape;

export async function initDraw(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  
  let existingShapes: Shape[] = await getExistingShapes(roomId);
  clearCanvas(existingShapes, canvas, ctx);


  let clicked = false;
  let startX = 0;
  let startY = 0;
  let currentPencil: PencilShape | null = null;


  function getMousePos(e: MouseEvent): Point {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  socket.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.type === "chat") {
      const { shape } = JSON.parse(msg.message);
      existingShapes.push(shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  };

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    const { x, y } = getMousePos(e);
    startX = x;
    startY = y;

    // @ts-ignore
    if (window.selectedTool === "pencil") {
      currentPencil = {
        type: "pencil",
        points: [{ x, y }],
        strokeColor: "white",
        strokeWidth: 2,
      };
    }
  });


  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;
    const { x, y } = getMousePos(e);
    const dx = x - startX;
    const dy = y - startY;

    clearCanvas(existingShapes, canvas, ctx);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    // @ts-ignore
    const tool = window.selectedTool as "rect" | "circle" | "pencil";

    if (tool === "rect") {
      ctx.strokeRect(startX, startY, dx, dy);

    } else if (tool === "circle") {
      const r = Math.max(Math.abs(dx), Math.abs(dy)) / 2;
      ctx.beginPath();
      ctx.arc(startX + dx/2, startY + dy/2, r, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();

    } else if (tool === "pencil" && currentPencil) {
      
      currentPencil.points.push({ x, y });
      drawShape(currentPencil, ctx);
    }
  });

  
  canvas.addEventListener("mouseup", (e) => {
    if (!clicked) return;
    clicked = false;
    const { x, y } = getMousePos(e);

    // @ts-ignore
    const tool = window.selectedTool as "rect" | "circle" | "pencil";
    let finalShape: Shape | null = null;

    if (tool === "rect") {
      finalShape = {
        type: "rect",
        x: startX,
        y: startY,
        width: x - startX,
        height: y - startY,
      };

    } else if (tool === "circle") {
      const dx = x - startX;
      const dy = y - startY;
      finalShape = {
        type: "circle",
        centerX: startX + dx/2,
        centerY: startY + dy/2,
        radius: Math.max(Math.abs(dx), Math.abs(dy)) / 2,
      };

    } else if (tool === "pencil" && currentPencil) {
      finalShape = currentPencil;
    }

    if (finalShape) {
      existingShapes.push(finalShape);
      socket.send(
        JSON.stringify({
          type: "chat",
          message: JSON.stringify({ shape: finalShape }),
          roomId,
        })
      );
      currentPencil = null;
      clearCanvas(existingShapes, canvas, ctx);
    }
  });
}


function clearCanvas(
  shapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((s) => drawShape(s, ctx));
}


function drawShape(shape: Shape, ctx: CanvasRenderingContext2D) {
  if (shape.type === "rect") {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);

  } else if (shape.type === "circle") {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

  } else if (shape.type === "pencil") {
    ctx.strokeStyle = shape.strokeColor;
    ctx.lineWidth = shape.strokeWidth;
    ctx.beginPath();
    shape.points.forEach((pt, i) =>
      i === 0 ? ctx.moveTo(pt.x, pt.y) : ctx.lineTo(pt.x, pt.y)
    );
    ctx.stroke();
    ctx.closePath();
  }
}


async function getExistingShapes(roomId: string): Promise<Shape[]> {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  return res.data.messages.map((m: any) => JSON.parse(m.message).shape);
}
