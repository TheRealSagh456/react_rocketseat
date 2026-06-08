import Card from "../components/card";
import InputEnum, { type Types } from "../components/input-enum";
import Input from "../components/input";
import Button from "../components/button";
import React, { useEffect } from "react";


export default function Refund() {

    const [name, setName] = React.useState("")
    const [category, setCategory] = React.useState<Types>("")
    const [value, setValue] = React.useState("")
    const [arch, setArch] = React.useState<File | null>(null)
    const [preview, setPreview] = React.useState('')

    useEffect(() => {
        return () => {
        if (preview) {
          URL.revokeObjectURL(preview)
        }
      }
    }, [preview])
    return (
         <div className="min-h-screen flex w-full justify-center p-4 ">
        <Card 
        title="Solicitação de reembolso" 
        titleClassName="text-gray-100 font-bold"
        subtitle="Dados da despesa para solicitar reembolso"
        className="gap-1 w-full max-w-lg px-6 h-fit">
            <form className="mt-4 flex flex-col gap-2">
                <div className="pb-4">
                    <Input type="text" title="NOME DA SOLICITAÇÃO" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (
                        setName(e.target.value))}/>
                </div>

                <div className="flex justify-between gap-6 pb-4">
                    <div className="w-110">
                        <InputEnum className="flex-1" label="CATEGORIAS" value={category ?? ""} onValueChange={setCategory}/>
                    </div>
                
                    <div>
                        <Input type="text" inputMode="decimal" title="VALOR" className="inset-0" value={value} placeholder="0,00" step={0.01}
                        onChange={(e) => {
                            if (!e.target.value) return
                            setValue(e.target.value)
                        }}
                        onBlur={(e) => {
                            if (!value) return
                            const numeric = Number(e.target.value.replace(',', '.'))
                            
                            if(isNaN(numeric)) return

                            const formatted = numeric.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })

                            setValue(formatted)
                            console.log(formatted)
                        }}/>
                    </div>
                </div>

                <div>
                    <Input type="file" title="COMPROVANTE" preview={preview} file={arch} onFileChange={(file, preview) => {                         

                        setArch(file)
                        setPreview(preview)
                        console.log(file, preview)
                    }
                    }/>
                </div>

                <Button type='button' className="w-full gap-2 h-13" onClick={() => (console.log(name, category, value))}
                disabled={!name || !category || !value || !arch}>
                    <span>Enviar</span>
                </Button>
            </form>
        </Card>
        </div>
    )
}