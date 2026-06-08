import Button from "../components/button";
import Card from "../components/card";
import InputEnum, { type Types } from "../components/input-enum";
import Input from "../components/input";
import FileIcon from '../assets/icons/file.svg?react'
import DialogContent, { Dialog, DialogTrigger } from "../components/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import type { IconNames } from "../components/icons";

    const categoryMap: Record<string, keyof typeof IconNames> = {
        "food": "Alimentação",
        "hosting": "Hospedagem",
        "transport": "Transporte",
        "services": "Serviços",
        "other": "Outros",
    }

export default function GetRefund() {

    const [value, setValue] = React.useState("")

    const {id} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: [`/refunds/${id}`],
        queryFn: () => api.get(`/refunds/${id}`).then(res => res.data.refund)
        
    })

    return (
        <div className="min-h-screen flex w-full justify-center p-4 ">
            <Card 
            title="Solicitação de reembolso" 
            titleClassName="text-gray-100 font-bold"
            subtitle="Dados da despesa para solicitar reembolso"
            className="gap-1 w-full max-w-lg px-6 h-fit">
                <form className="mt-4 flex flex-col gap-2">
                    <div className="pb-4">
                        <Input type="text" title="NOME DA SOLICITAÇÃO" value={data?.title ?? ''} readOnly/>
                    </div>

                    <div className="flex justify-between gap-6 pb-6">
                        <div className="w-full">
                            <InputEnum className="flex-1" label="CATEGORIAS" 
                            value={categoryMap[data?.category ?? ''] ?? ""}/>
                        </div>
                    
                        <div>
                            <Input type="text" 
                            inputMode="decimal" 
                            title="VALOR" 
                            className="inset-0" 
                            value={data?.value.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }) ?? ''} 
                            readOnly
                            placeholder="0,00" 
                            step={0.01}
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

                    <div className="">
                        <Button type="button" className="border bg-white w-full gap-2 hover:bg-white hover:border-green-200 h-13">
                            <FileIcon className="fill-green-200 scale-80"/> 
                            <span className="text-green-200">Abrir comprovante</span>
                            {/* Vai ter que ter um loading escrito "abrindo comprovante..." */}
                        </Button>
                    </div>

                    <div>
                        <Dialog>
                            <DialogTrigger className="w-full gap-2 h-13" asChild>
                                <Button type="button" className="w-full gap-2 h-13">
                                    <span>Excluir</span>
                                </Button>        
                            </DialogTrigger>
                            <DialogContent title="Excluir Solicitação">
                                <div className="flex flex-col gap-3">
                                    <span>
                                        Tem certeza que deseja excluir essa solicitação? Essa ação é <br/>
                                        irreversível.
                                    </span>
                                    <div className="flex gap-2 justify-end">                            
                                        <DialogClose asChild>
                                            <Button className="min-w-fit p-2 bg-transparent hover:bg-transparent">
                                                <span className="text-green-100">Cancelar</span>
                                            </Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button onClick={() => {
                                                toast.success("Solicitação de reembolso excluída com sucesso")
                                                }}>
                                                <span className="font-bold">Confirmar</span>
                                            </Button>
                                        </DialogClose>
                                    </div>
                                </div>
                            </DialogContent>    
                        </Dialog>
                        
                    </div>
                </form>
            </Card>
        </div>
    )
}