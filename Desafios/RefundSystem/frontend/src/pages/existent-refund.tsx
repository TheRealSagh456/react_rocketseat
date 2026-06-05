import Button from "../components/button";
import Card from "../components/card";
import InputEnum from "../components/input-enum";
import Input from "../components/input";
import FileIcon from '../assets/icons/file.svg?react'


export default function GetRefund() {

    return (
        <div className="flex w-full justify-center py-10">
        <Card 
        title="Solicitação de reembolso" 
        subtitle="Dados da despesa para solicitar reembolso"
        className="gap-1 w-130">
            <form className="mt-4 flex flex-col gap-2">
                <div className="pb-4">
                    <Input type="text" title="NOME DA SOLICITAÇÃO"/>
                </div>

                <div className="flex justify-between gap-6 pb-6">
                    <div className="w-110">
                        <InputEnum className="flex-1" label="CATEGORIAS"/>
                    </div>
                
                    <div>
                        <Input type="text" inputMode="decimal" title="VALOR" className="inset-0" step={0.01} placeholder="0,00"
                        onBlur={(e) => {
                            if (!e.target.value) return
                            const value = Number(e.target.value.replace(',', '.'))

                            e.target.value = value.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })
                        }}/>
                    </div>
                </div>

                <div className="">
                    <Button className="border bg-white w-full gap-2 hover:bg-white hover:border-green-200 h-13">
                        <FileIcon className="fill-green-200 scale-80"/> 
                        <span className="text-green-200">Abrir comprovante</span>
                        {/* Vai ter que ter um loading escrito "abrindo comprovante..." */}
                    </Button>
                </div>

                <div>
                    <Button className="w-full gap-2 h-13">
                        <span>Excluir</span>
                    </Button>
                </div>
            </form>
        </Card>
        </div>
    )
}