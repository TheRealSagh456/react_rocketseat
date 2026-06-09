import { cva, cx, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonVariations = cva(`flex items-center justify-center rounded-xl`, {
    variants: {
        variant: {
            default: "border-2 border-transparent bg-yellow w-85 h-16 rounded hover:!border-yellow-light cursor-pointer"
        },
        disabled: {
            true: `opacity-30 pointer-events-none`
        }
    },
    defaultVariants: {
        variant: "default",
        disabled: false
    }
})
interface ButtonProps extends React.ComponentProps<`button`>, VariantProps<typeof buttonVariations> {}

export default function Button({className, children, variant, disabled, ...props} : ButtonProps) {
    return (
    <button className={cx(buttonVariations({variant, disabled}), className)}  {...props}> 
        {children} 
    </button>
)
}