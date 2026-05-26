import { cx } from "class-variance-authority";
import React from "react";

interface ButtonProps extends React.ComponentProps<`button`> {}

const baseStyle = `border-2 border-transparent bg-yellow w-85 h-16 rounded`
const enabledStyle = `hover:border-yellow-light cursor-pointer`
const disabledStyle = `opacity-30 pointer-events-none`

export default function Button({className, children, disabled=false, ...props} : ButtonProps) {
    return (
    <button disabled={disabled} className={cx(baseStyle, !disabled && enabledStyle, disabled && disabledStyle, className)
    }  {...props}> 
        {children} 
    </button>
)
}