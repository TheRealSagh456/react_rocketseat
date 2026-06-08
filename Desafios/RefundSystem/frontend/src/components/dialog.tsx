import * as DialogPrimitive from "@radix-ui/react-dialog"
import Card from "./card"
import { cx } from "tailwind-variants"
import React from 'react'

export const Dialog = DialogPrimitive.Root

export const DialogTrigger = DialogPrimitive.Trigger

export const DialogClose = DialogPrimitive.Close

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogPrimitive.DialogContentProps
>(({ className, children, title, ...props }, ref) => {
  return (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={cx(`
            fixed inset-0 z-50 bg-gray-100/40
            backdrop-blur-sm data-[state=open]:animate-in
            data-[state=open]:fade-in-0
            data-[state=closed]:animate-out
            data-[state=closed]:fade-out-0
            `)}/>
      <DialogPrimitive.Content
        ref={ref}
        className={cx(
          `
          fixed left-[50%] top-[50%] w-full max-w-lg
          z-60 translate-x-[-50%] translate-y-[-50%]
          data-[state=open]:animate-in
          data-[state=open]:fade-in-0
          data-[state=open]:slide-in-from-bottom-[48%]
          data-[state=closed]:animate-out
          data-[state=closed]:slide-out-to-bottom-[48%]
          data-[state=closed]:fade-out-0
          `,
          className
        )}
        {...props}
      >
        <Card
          title={title}
          titleClassName="font-bold text-gray-100"
        >
          {children}
        </Card>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
})

DialogContent.displayName = "DialogContent"

export default DialogContent