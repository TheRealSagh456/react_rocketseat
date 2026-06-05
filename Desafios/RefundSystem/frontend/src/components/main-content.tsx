import { cx } from "tailwind-variants";


interface MainContentProps extends React.ComponentProps<'main'> {}

export default function MainContent({className, children, ...props}: MainContentProps) {
    return <main className={cx("mt-20 px-30", className)} {...props}>{children}</main>
}