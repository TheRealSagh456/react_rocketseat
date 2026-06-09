import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";



const timeButtonVariations = cva(`flex items-center justify-center rounded-xl`, {
    variants: {
        variant: {
            default: `h-10 w-19 text-md text-gray-200 bg-gray-600 enabled:hover:bg-gray-500 focus:outline-none`
        },
        disabled: {
            true: `border border-gray-500 point-events-none bg-transparent text-gray-500`
        },
        selected: {
            true: `!text-yellow border border-yellow`
        }
    },
    defaultVariants: {
        variant: `default`
    },
})

interface TimeButtonProps extends React.ComponentProps<`button`>, VariantProps <typeof timeButtonVariations> {}

export default function TimeButton({className, variant ,children, disabled, selected=false, ...props}: TimeButtonProps) {
    return (
        <button disabled={disabled} className={timeButtonVariations({variant, disabled, className, selected})} {...props} >
            {children}
        </button>
    )
}