"use client";

import { WS_URL } from "@/config";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0MmU1MjMyNS1jMjU0LTQ2NmYtYWQ1Yi05Y2FiNmI5YmQyNGEiLCJpYXQiOjE3NTIxNjc1NTB9.CzR1GKoW2e-IcgFvxTjJOiaxB7dzL6Dx57F2PjJxTMo`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            });
            console.log(data);
            ws.send(data)
        }
        
    }, [])
   
    if (!socket) {
        return <div>
            Connecting to server....✋
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}