import type React from "react"
import Icon from "./icon"
import { cx } from "class-variance-authority"

interface IconButtonProps extends React.ComponentProps<`button`> {
    icon: React.ComponentProps<typeof Icon>[`svg`]
}

export default function IconButton({className, icon, ...props}: IconButtonProps) {
    return (
        <button className={
            cx("group flex items-center justify-center bg-transparent w-9 h-9 hover:bg-gray-800",className)
            } {...props}>
            <Icon svg={icon} className="group-hover:fill-yellow-dark"/>
        </button>
    )
}