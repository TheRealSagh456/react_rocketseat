import { cx, tv } from "tailwind-variants"

const cardVariants = tv({
    base: 'bg-white rounded-xl shadow-sm shadow-black/20 w-fit'
})

interface CardProps extends React.ComponentProps<'div'> {
    subtitle?: string,
}

export default function Card({title, subtitle, children, className, ...props}: CardProps) {
    return (
        <div className={cx(cardVariants({className}), 'flex flex-col py-12 px-12')} {...props}>
            <h2 className="text-gray-100 text-3xl font-bold">
                {title}
            </h2>
            
            <h3 className="text-gray-200">
                {subtitle}
            </h3>
            
            <div className="flex flex-col gap-4 mt-3">
                {children}
            </div>
        </div>
    )
}