import { cx } from "class-variance-authority";
import React from "react";

interface IconProps extends React.ComponentProps<'svg'> {
    svg: React.FC<React.ComponentProps<'svg'>>
}

export default function Icon({svg: Svg, className, ...props} : IconProps) {
    return (
        <Svg className={cx(`fill-yellow` ,className)} {...props} />
    )
}