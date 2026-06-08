import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
import Item from "../components/item";
import LeftArrow from "../assets/icons/left-arrow.svg?react"
import RightArrow from "../assets/icons/right-arrow.svg?react"
import Lupa from "../assets/icons/search.svg?react"
import type { Types } from "../components/input-enum";
import React, { useMemo } from "react";

interface ItemMock {
  id: number;
  nome: string;
  valor: number;
  variant: Types | "";
}

export const mockItems: ItemMock[] = [
  { id: 1, nome: "Samuel", valor: 200.25, variant: "Hospedagem" },
  { id: 2, nome: "Milton", valor: 2500.5, variant: "Transporte" },
  { id: 3, nome: "Chico", valor: 2000.25, variant: "Hospedagem" },
  { id: 4, nome: "Elis", valor: 2500.5, variant: "Transporte" },
  { id: 5, nome: "Cartola", valor: 3300.25, variant: "Hospedagem" },
  { id: 6, nome: "Choras", valor: 2.5, variant: "Transporte" },
  { id: 7, nome: "Neymar", valor: 200000.25, variant: "Hospedagem" },
  { id: 8, nome: "Robinho", valor: 16070.5, variant: "Transporte" },
  { id: 9, nome: "Seu Jorge", valor: 450.0, variant: "Hospedagem" },
  { id: 10, nome: "Alcione", valor: 1200.75, variant: "Transporte" },
  { id: 11, nome: "Tim Maia", valor: 3500.0, variant: "Hospedagem" },
  { id: 12, nome: "Ronaldinho", valor: 85000.99, variant: "Transporte" },
  { id: 13, nome: "Gal Costa", valor: 2100.5, variant: "Hospedagem" },
  { id: 14, nome: "Gabigol", valor: 55000.0, variant: "Transporte" }

];

export default function HomePage() {

    const [page, setPage] = React.useState(1)

    const pages = Math.ceil(mockItems.length / 8)

    const items = (page-1)*8

    const itemsMostrados = useMemo(() => {
        return mockItems.slice(items,items+8)
    }, [page, items])

    return (
        <div className="flex w-full justify-center py-10 px-4 md:px-20">
            <Card title="Solicitações" className="w-full gap-1 min-h-210">

                <div className="flex w-full gap-2 items-center">
                    <div className="flex-1 min-w-0">
                    <Input placeholder="Pesquisar pelo nome"/>
                    </div>

                    <Button icon disabled>
                    <Lupa className="fill-white w-5"/>
                    </Button>
                
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                {itemsMostrados.map(item => 
                    <Item key={item.id}
                    nome={item.nome}
                    valor={item.valor}
                    variant={item.variant}
                    />
                )}
                </div>

                <div className="flex gap-1 justify-center items-center mt-auto">
                    <Button icon className="scale-70" disabled={page === 1} onClick={() => setPage(page-1)}>
                    <LeftArrow fill="white"/>
                    </Button>
                    <span className="text-gray-100 text-xl">{`${page}/${pages}`}</span>
                    <Button icon className="scale-70" disabled={page === pages} onClick={() => setPage(page+1)}>
                    <RightArrow fill="white"/>
                    </Button>
                </div>
            
            </Card>

        </div>
   )
}