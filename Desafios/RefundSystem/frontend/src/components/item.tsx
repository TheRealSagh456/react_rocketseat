import { cx, tv } from "tailwind-variants"
import Icon, { IconNames } from "./icons"


const itemVariants = tv({
    base: 'flex justify-between items-center'
})

interface ItemProps extends React.ComponentProps<'div'> {
    variant: keyof typeof IconNames
    valor: number
    nome: string
}

export default function Item({className, variant, valor, nome, ...props}: ItemProps) { 

    const valorFormatado = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })
    
    return (
        <div className={cx(itemVariants(),className)} {...props}>
            <div className="flex gap-3 min-w-0 items-center">
                <Icon type={variant}/>
                <div className="flex flex-col leading-tight">
                    <div className="text-gray-100 font-semibold text-xl">
                        {nome}
                    </div>
                    <div className="text-gray-200">
                        {variant}
                    </div>
                </div>
            </div>
            
            <div className="flex gap-2 shrink-0">
                <div className="text-gray-200">
                    R$
                </div>
                <div className="text-gray-100 font-semibold">
                    {valorFormatado}
                </div>
            </div>
        </div>
    )
}