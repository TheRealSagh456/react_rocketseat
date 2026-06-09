import Button from "../components/button";
import Card from "../components/card";
import InputEnum from "../components/input-enum";
import Input from "../components/input";
import FileIcon from '../assets/icons/file.svg?react'
import DialogContent, { Dialog, DialogTrigger } from "../components/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import type { IconNames } from "../components/icons";
import React from "react";

    const categoryMap: Record<string, keyof typeof IconNames> = {
        "food": "Alimentação",
        "hosting": "Hospedagem",
        "transport": "Transporte",
        "services": "Serviços",
        "other": "Outros",
    }

export default function GetRefund() {

    const {id} = useParams()

    const [isLoadingReceipt, setIsLoadingReceipt] = React.useState(false)

    const {data} = useQuery({
        queryKey: [`/refunds/${id}`],
        queryFn: () => api.get(`/refunds/${id}`).then(res => res.data.refund)
    })
    const navigate = useNavigate()


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
                            />
                        </div>
                    </div>

                    <div className="">
                        <Button 
                        type="button" 
                        className="border bg-white w-full gap-2 hover:bg-white hover:border-green-200 h-13" 
                        onClick={async () => {
                            setIsLoadingReceipt(true)
                            const res = await api.get(`/receipts/download/${data?.receipt.id}`)
                            window.open(`http://localhost:3333${res.data.url}`, '_blank')
                            setIsLoadingReceipt(false)
                        }}>
                            <FileIcon className="fill-green-200 scale-80"/> 
                            <span className="text-green-200">{isLoadingReceipt ? 'Abrindo comprovante...' : 'Abrir comprovante'}</span>
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
                                            <Button onClick={async () => {
                                            try {
                                                await api.delete(`/refunds/${id}`)
                                                toast.success("Solicitação excluída com sucesso")
                                            } catch(err) {
                                                toast.error("Erro ao excluir solicitação")
                                                console.error(err)
                                            } finally {navigate('/')}
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