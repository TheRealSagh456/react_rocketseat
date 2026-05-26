//card tem que ser personalizavel, texto em cima, icone na esquerda e periodo na direita, info em baixo

import { cx } from "class-variance-authority"
import Icon from "./icon"
import Text from "./text"

interface CardProps extends React.ComponentProps<`div`> {
    className?: string
    icon: React.ComponentProps<typeof Icon>[`svg`]
    children: React.ReactNode
    title: string,
    period: string,
}

export default function Card({icon, className, children,title, period, ...props}: CardProps) {
    return (
        <div className={cx(`flex flex-col justify between border-2 w-138 rounded-xl border-gray-500`,className)} {...props}>
            <div className="w-137 h-15 border-b-2 border-gray-500">
                <div className="flex gap-3 my-4 ml-6 justify-between">
                    <div className="flex gap-3">
                        <Icon svg={icon}/> 
                        <Text variant="text-md" className="flex text-gray-300">
                            {title}
                        </Text> 
                    </div>
                    <div>
                        <Text variant="text-md" className="flex mr-6 text-gray-300">{period}</Text>
                    </div> 
                    
                </div>
            </div>

            <div className="text-gray-300 my-6 ml-6">
                {children}
            </div>
        </div>
    )
}