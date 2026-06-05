import Button from "../components/button";
import Lupa from "../assets/icons/search.svg?react"
import Input from "../components/input";
import Logo from "../assets/logo/Logo.svg?react"
import Icon from "../components/icons";
import Card from "../components/card";
import Item from "../components/item";
import LeftArrow from "../assets/icons/left-arrow.svg?react"
import RightArrow from "../assets/icons/right-arrow.svg?react"
import InputEnum from "../components/input-enum";

export default function Components() {
    return (
        <div className="flex flex-col m-5 gap-8">

            <Logo/>
        
            <h1 className="text-gray-200 text-5xl">
                TESTE
            </h1>
            <div className="flex gap-3">
                <Button className="px-20 py-3 text-white font-bold">
                Label
                </Button>
                <Button disabled className="px-17 py-3">
                Disabled
                </Button>
            </div>

            <div className="flex gap-3">
                <Button icon>
                <Lupa className="fill-white w-5"/>
                </Button>
                <Button icon disabled>
                <Lupa className="fill-white w-5"/>
                </Button>
            </div>

            <div className="w-50 flex flex-col gap-3">
                <Input title='Título' placeholder="Escreva algo..."/>
                <InputEnum label="Categorias"/>
            </div>

            <div className="flex gap-4">
                <Icon type="Alimentação"/>
                <Icon type="Hospedagem"/>
                <Icon type="Outros"/>
                <Icon type="Serviços"/>
                <Icon type="Transporte"/>
            </div>

            <div>
                <Card title="Solicitações" className="w-200">

                <div className="flex w-full gap-2 items-center">
                    <div className="flex-1 min-w-0">
                    <Input placeholder="Pesquisar pelo nome"/>
                    </div>

                    <Button icon disabled>
                    <Lupa className="fill-white w-5"/>
                    </Button>
                
                </div>
                
                <Item nome="Samuel" valor={200.25} variant="Hospedagem"/>
                <Item nome="Milton" valor={2500.5} variant="Transporte"/>
                <Item nome="Chico" valor={2000.25} variant="Hospedagem"/>
                <Item nome="Elis" valor={2500.5} variant="Transporte"/>
                <Item nome="Cartola" valor={3300.25} variant="Hospedagem"/>
                <Item nome="Choras" valor={2.5} variant="Transporte"/>
                <Item nome="Neymar" valor={200000.25} variant="Hospedagem"/>
                <Item nome="Robinho" valor={16070.5} variant="Transporte"/>

                <div className="flex gap-1 mt-4 justify-center items-center">
                    <Button icon className="scale-70">
                    <LeftArrow fill="white"/>
                    </Button>
                    <span className="text-gray-100 text-xl">1/3</span>
                    <Button icon className="scale-70">
                    <RightArrow fill="white"/>
                    </Button>
                </div>
                
                </Card>
            </div>
        
        </div>
    )
}