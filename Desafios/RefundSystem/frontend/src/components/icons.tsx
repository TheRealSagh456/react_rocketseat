import { tv } from "tailwind-variants"
import IconFood from "../assets/icons/food.svg?react"
import IconBed from "../assets/icons/bed.svg?react"
import IconCar from "../assets/icons/car.svg?react"
import IconTool from "../assets/icons/tool.svg?react"
import IconOutros from "../assets/icons/file.svg?react"

const iconVariants = tv({
    base: 'flex items-center justify-center rounded-full bg-gray-400 w-10 h-10',
})

export const IconNames = {
    Alimentação: IconFood,
    Hospedagem: IconBed,
    Transporte: IconCar,
    Serviços: IconTool ,
    Outros: IconOutros,
    '': ''
}

interface IconProps extends React.ComponentProps<'div'> {
    type: keyof typeof IconNames
}

export default function Icon({className, type, ...props}: IconProps) {
    const Icone = IconNames[type]
    return (
        <div className={iconVariants({className})} {...props}>
            <Icone className="w-5 h-5 fill-green-100"/>
        </div>
    )
}