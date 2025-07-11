import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI5MWExM2QwNC0zNGVhLTQyNzItOGNlYS1kMDhlNmE4ZjExNTEiLCJpYXQiOjE3NTE3Mjg3Njd9.gf4-X5E1LnYo9XAWO8NCf6i0hojMYi4UyeGMzVkZGQY`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }

}