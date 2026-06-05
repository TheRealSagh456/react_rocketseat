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
}

export default function Input({
    className,
    title,
    type,
    ...props
}: InputProps) {
    const [file, setFile] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState('')

    function handleFileUp (e: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = e.target.files?.[0]

    if(!uploadedFile) {
        return;
    }

    if (uploadedFile.type !== 'application/pdf') {
        toast.error("Tipo de arquivo inválido!")
        return;
    }

    if(uploadedFile.size > 5*1024**2) {
        toast.error("Tamanho máximo excedido!")
        return;
    }

    const filePreview = URL.createObjectURL(uploadedFile)
    setFile(uploadedFile)
    setPreview(filePreview)

    return
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
                        accept=".pdf" 
                        ref={inputRef}
                        onChange={handleFileUp} 
                        className="opacity-0 absolute pointer-events-none" 
                    />
                    </div>
                    
                </div>
                <div>
                    {!preview ? '' : <iframe src={preview} className="border h-155 w-full"/> }
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