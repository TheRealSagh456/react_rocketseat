import Card from "../components/card";
import ConfirmationIcon from "../assets/icons/confirmation.svg?react"
import Button from "../components/button";
import { useNavigate } from "react-router-dom";


export default function Confirmation() {
    const navigate = useNavigate()

    return(
        <div className="flex w-full justify-center py-10">
            <Card 
            title="Solicitação enviada!"
            titleClassName="text-green-200 font-bold"
            className="flex flex-col gap-3 items-center justify-center">
            <div className="mx-35 -mt-3">
                <ConfirmationIcon/>
            </div>
            
            <span>Agora é apenas aguardar! Sua solicitação será analisada e <br/> em breve o setor financeiro irá entrar em contato com você.</span>

            <Button type="button" className="w-full mt-2 h-13" onClick={() => navigate('/new-refund')}>
                <span className="font-bold">Nova solicitação</span>
            </Button>
            </Card>
        </div>
    )
}