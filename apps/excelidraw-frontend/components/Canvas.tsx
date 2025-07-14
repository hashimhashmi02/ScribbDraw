import React, { useEffect, useRef, useState } from "react";
import {
  Circle,
  Pencil,
  RectangleHorizontalIcon,
  Eraser,
  Hand,
  RotateCcw,
  RotateCw,
  Download,
} from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "hand" | "pencil" | "rect" | "circle" | "eraser";

interface CanvasProps {
  roomId: string;
  socket: WebSocket;
}

export function Canvas({ roomId, socket }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("hand");
  const [color, setColor] = useState("#ffffff");
  const [strokeWidth, setStrokeWidth] = useState(2);

  // Initialize Game
  useEffect(() => {
    if (!canvasRef.current) return;
    const g = new Game(canvasRef.current, roomId, socket);
    setGame(g);
    return () => g.destroy();
  }, [canvasRef, roomId, socket]);

  // Sync React state → Game
  useEffect(() => { game?.setTool(selectedTool); }, [selectedTool, game]);
  useEffect(() => { game?.setColor(color); }, [color, game]);
  useEffect(() => { game?.setStrokeWidth(strokeWidth); }, [strokeWidth, game]);

  // Undo / Redo
  const undo = () => game?.undo();
  const redo = () => game?.redo();

  // Download handler
  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `scribdraw-${roomId}.png`;
    a.click();
  };

  // Slim, aesthetic toolbar
  const toolbarStyle: React.CSSProperties = {
    position: "fixed",
    top: 8,
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(12px)",
    padding: "4px 8px",
    borderRadius: "9999px",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 10,
  };

  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: 32,
    height: 32,
    borderRadius: "50%",
    border: "none",
    background: active ? "rgba(255,255,255,0.2)" : "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: active ? "#fff" : "rgba(255,255,255,0.6)",
    transition: "background 0.2s, color 0.2s",
  });

  return (
    <div style={{ height: "100vh", overflow: "hidden", position: "relative", background: "#111" }}>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ display: "block", touchAction: "none" }}
      />

      <div style={toolbarStyle}>
        {/* Tools */}
        <button style={btnStyle(selectedTool === "hand")} onClick={() => setSelectedTool("hand")}>
          <Hand size={16} />
        </button>
        <button style={btnStyle(selectedTool === "pencil")} onClick={() => setSelectedTool("pencil")}>
          <Pencil size={16} />
        </button>
        <button style={btnStyle(selectedTool === "rect")} onClick={() => setSelectedTool("rect")}>
          <RectangleHorizontalIcon size={16} />
        </button>
        <button style={btnStyle(selectedTool === "circle")} onClick={() => setSelectedTool("circle")}>
          <Circle size={16} />
        </button>
        <button style={btnStyle(selectedTool === "eraser")} onClick={() => setSelectedTool("eraser")}>
          <Eraser size={16} />
        </button>

        {/* Undo / Redo */}
        <button style={btnStyle(false)} onClick={undo}>
          <RotateCcw size={16} />
        </button>
        <button style={btnStyle(false)} onClick={redo}>
          <RotateCw size={16} />
        </button>

        {/* Color Picker */}
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Pick color"
          style={{
            width: 24,
            height: 24,
            padding: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        />

        {/* Stroke Width */}
        <input
          type="range"
          min={1}
          max={10}
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          title="Stroke width"
          style={{ width: 60 }}
        />

        {/* Download */}
        <button style={btnStyle(false)} onClick={downloadCanvas} title="Download">
          <Download size={16} />
        </button>
      </div>
    </div>
  );
}
