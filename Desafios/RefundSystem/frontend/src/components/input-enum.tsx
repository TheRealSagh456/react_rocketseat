import { cx, tv } from "tailwind-variants";
import { IconNames } from "./icons";
import DownArrow from '../assets/icons/caret-down.svg?react'
import { useState } from "react";

export const inputEnumButtonVariants = tv({
    base: `border rounded-lg w-full
     border-gray-300 h-11 bg-transparent hover:bg-transparent
     hover:border-green-200 transition
     text-gray-200 relative flex items-center justify-between
     p-3`
})

export const inputEnumVariants = tv({
    base: `text-gray-200 border w-full border-transparent bg-white hover:bg-green-100/10
    h-11 hover:border-green-100 transition
     flex justify-between items-center px-4 rounded-lg`,
})

interface InputEnumProps extends React.ComponentProps<'div'> {
    label?:string
    wrapperClassName?: string
    visible?: boolean
}

export type Types = keyof typeof IconNames



export default function InputEnum({wrapperClassName, className, label, visible, ...props}: InputEnumProps) {
    const categorias = Object.keys(IconNames) as Types[]

    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState<Types | null>(null)

    function showOptions() {
        setOpen(prevOpen => !prevOpen)
    }

    return (
        <div className="flex flex-col relative">
            {label && (
                    <label className="text-gray-200 text-sm">
                        {label}
                    </label>
                )}
            <div className={cx(wrapperClassName)} {...props}>
                <button type="button" onClick={showOptions} className={inputEnumButtonVariants()}>
                    <span className="text-gray-200">
                    {selected ? selected : 'Selecione'} 
                    </span>
                     <DownArrow className="fill-gray-200 p-1"/>
                </button>

                {open && (
                        <div className="absolute w-full top-full left-0 bg-white rounded-lg mt-1 z-10">
                            {categorias.map((option) => (
                                <button type='button' key={option} className={inputEnumVariants()} onClick={
                                    () => {
                                    setSelected(option)
                                    setOpen(false)}}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                
            </div>

            
        </div>
    )
}