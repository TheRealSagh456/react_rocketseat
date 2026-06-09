import { cx } from "class-variance-authority";
import type React from "react";
import Icon from "./icon";

const inputTextStyle = `text-md text-white rounded-xl h-15 border-1 border-gray-500 focus:border-yellow outline-none`

interface InputTextProps extends React.ComponentProps<`input`> {
    icon: React.ComponentProps<typeof Icon>[`svg`]
    containerClassName?: string
}

export default function InputText({className, containerClassName, icon, ...props} : InputTextProps) {
    return (
        <div className={cx("relative", containerClassName)}>
            <Icon svg={icon} className="absolute left-4 top-1/2 -translate-y-1/2 z-10"/>
            <input className={cx(inputTextStyle, className, `pl-12`)} {...props}/>
        </div>
    )
}