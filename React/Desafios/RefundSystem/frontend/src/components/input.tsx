import React from "react"
import { cx, tv, type VariantProps } from "tailwind-variants"
import {toast} from 'sonner'
import Button from "./button"
import UploadIcon from '../assets/icons/cloud.svg?react'

const InputVariants = tv({
    base: `border rounded-lg w-full
     border-gray-300 h-11 outline-none 
     hover:border-green-100 transition
     appearance-none p-3`
})

interface InputProps extends React.ComponentProps<'input'>, VariantProps<typeof InputVariants> {
    file?: File | null
    preview?: string
    onFileChange?: (file: File, preview: string) => void
}

export default function Input({
    className,
    title,
    type,
    file,
    onFileChange,
    preview,
    ...props
}: InputProps) {

    const allowedTypes = [
        'application/pdf',
        'image/png',
        'image/jpeg'
    ]

function handleFileUp (e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0]

    if(!uploadedFile) {
        return;
    }

    if(uploadedFile.size > 2*1024**2) {
        toast.error("Tamanho máximo excedido!")
        return;
    }

    if (!allowedTypes.includes(uploadedFile.type)) {
        toast.error("Tipo de arquivo não permitido.")
        return
    }

    const filePreview = URL.createObjectURL(uploadedFile)
    onFileChange?.(uploadedFile, filePreview)
    
}

    const inputRef = React.useRef<HTMLInputElement>(null)

    return (
        <>
        {type === 'file' ? (
            <div className="flex flex-col gap-3">
                <div className={cx("flex flex-col relative")}>
                    <label className='text-sm text-gray-200'>{title}</label>
                    <div className={cx(InputVariants(), className, 'relative')}>
                        <div className="absolute inset-0 flex justify-between items-center pl-3">
                            {file 
                            ? 
                            file.name 
                            : 
                            <span className="text-gray-200 truncate">
                                Nome do arquivo.pdf
                            </span>
                            }
                            
                            <Button type="button" icon onClick={() => inputRef.current?.click()} className="shrink-0">
                                <UploadIcon className="fill-white"/>
                            </Button>
                            
                        </div>
                    <input
                        {...props}
                        type={'file'}
                        ref={inputRef}
                        accept={allowedTypes.join(',')}
                        onChange={handleFileUp} 
                        className="opacity-0 absolute pointer-events-none" 
                    />
                    </div>
                    
                </div>
                <div>
                    {file?.type === 'application/pdf' && <iframe src={preview} className="border h-155 w-full"/>}
                    {(file?.type.startsWith('image/')) && <img src={preview} className="border-2 border-green-100 w-full rounded-lg object-contain"/>}
                         
                </div>
            </div>
        ) : (
            <div className={cx("flex flex-col")}>
                <label className='text-sm text-gray-200'>{title}</label>
                <input type={type} className={cx(InputVariants(), className)} {...props}/>
            </div>
        )}
        </>
    )
}