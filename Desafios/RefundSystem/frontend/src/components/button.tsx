import {cx, tv, type VariantProps} from 'tailwind-variants'

const buttonVariants = tv({
    base: `flex items-center justify-center rounded-xl font-medium transition-colors bg-green-100 
    text-white cursor-pointer`,
    variants: {
        disabled: {
            true: 'opacity-50 pointer-events-none',
            false: 'hover:bg-green-200'
        },
        icon: {
            true: 'w-11 h-11 min-w-0',
            false: 'w-35 h-11'
        }
    },
    defaultVariants: {
        disabled: false,
        icon: false
    }
})

interface ButtonProps extends Omit<React.ComponentProps<'button'>, 'disabled'>, VariantProps<typeof buttonVariants> {
    className?: string
    disabled?: boolean
    icon?: boolean
}

export default function Button({
    className, disabled, children, icon, ...props
}: ButtonProps) {
    return (
        <button className={cx(buttonVariants({disabled, icon}), className)} disabled={disabled} {...props}>
            {children}
        </button>
    )
}