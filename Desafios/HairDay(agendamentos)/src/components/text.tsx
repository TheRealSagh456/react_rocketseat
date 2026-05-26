import { cva, cx, type VariantProps } from "class-variance-authority";
import React from "react";

export const textVariants = cva("font-sans", {
    variants: {
        variant: {
            "title-lg": "text-[23px] leading-6 font-bold text-white",//branco bold
            "title-md": "text-[16px] leading-6 font-bold text-gray-200",//gray-200 bold
            "title-sm": "text-[14px] leading-5 font-bold text-gray-300",//gray-300 bold
            "text-md": "text-[16px] leading-6 font-normal text-gray-200",//gray-200 regular
            "text-sm": "text-[14px] leading-5 font-normal text-gray-300",//gray-300 regular
        }
    },
    defaultVariants: {
        variant: "text-md"
    }
})

interface TextProps extends React.HtmlHTMLAttributes<HTMLElement> ,VariantProps<typeof textVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode
}

export default function Text({as = "span", className, variant, children, ...props} : TextProps) {
    return React.createElement(
        as,
        {
            className: cx(textVariants({variant}), className),
            ...props
        },
        children
    )
}