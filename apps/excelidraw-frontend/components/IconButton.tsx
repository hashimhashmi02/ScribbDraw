import { ReactNode } from "react"

export function IconButton({
    icon,onClick ,activated
}:{
    icon:ReactNode,
    onClick:()=> void,
    activated : boolean
}) {
    return <div className={`m-2 pointer rounded-full border p-2 bg-black hover:bg-grey 
        ${activated ? "text-red-400" : "text-white"}`} onClick={onClick} >
        {icon}
    </div>
}
