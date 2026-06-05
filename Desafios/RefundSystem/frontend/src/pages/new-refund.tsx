import Card from "../components/card";
import InputEnum from "../components/input-enum";
import Input from "../components/input";
import Button from "../components/button";



export default function Refund() {

    return (
        <div className="flex w-full justify-center py-10">
        <Card 
        title="Nova solicitação de reembolso" 
        subtitle="Dados da despesa para solicitar reembolso"
        className="gap-1 w-130">
            <form className="mt-4 flex flex-col gap-2">
                <div className="pb-4">
                    <Input type="text" title="NOME DA SOLICITAÇÃO"/>
                </div>

                <div className="flex justify-between gap-6 pb-4">
                    <div className="w-110">
                        <InputEnum className="flex-1" label="CATEGORIAS"/>
                    </div>
                
                    <div>
                        <Input type="text" inputMode="decimal" title="VALOR" className="inset-0" placeholder="0,00" step={0.01}
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

                <div>
                    <Input type="file" title="COMPROVANTE"/>
                </div>

                <Button type='button' className="w-full gap-2 h-13">
                    <span>Enviar</span>
                </Button>
            </form>
        </Card>
        </div>
    )
}