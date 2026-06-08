import { cx, tv } from "tailwind-variants"

const cardVariants = tv({
    base: 'bg-white rounded-xl shadow-sm shadow-black/20'
})

interface CardProps extends React.ComponentProps<'div'> {
    subtitle?: string,
    titleClassName?: string
}

export default function Card({title, subtitle, children, className, titleClassName, ...props}: CardProps) {
    return (
        <div className={cx(cardVariants({className}), 'flex flex-col flex-1 py-12 px-12')} {...props}>
            <h2 className={cx("text-3xl", titleClassName)}>
                {title}
            </h2>
            
            <h3 className="text-gray-200">
                {subtitle}
            </h3>
            
            <div className="flex flex-col gap-4 mt-3 flex-1">
                {children}
            </div>
        </div>
    )
}