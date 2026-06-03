import { cx, tv, type VariantProps } from "tailwind-variants"

const inputTextVariants = tv({
    base: `border rounded-lg w-full
     border-gray-300 h-11 outline-none hover:border-green-100 pl-4`
})

interface InputTextProps extends React.ComponentProps<'input'>, VariantProps<typeof inputTextVariants> {}

export default function InputText({
    className,
    title,
    ...props
}: InputTextProps) {
    return (
        <div className={cx("flex flex-col", className)}>
            <div className='text-sm text-gray-200'>{title}</div>
            <input type="text" className={cx(inputTextVariants(), className)} {...props}/>
        </div>
    )
}