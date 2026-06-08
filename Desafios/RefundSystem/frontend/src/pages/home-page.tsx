import Button from "../components/button";
import Card from "../components/card";
import Input from "../components/input";
import Item from "../components/item";
import LeftArrow from "../assets/icons/left-arrow.svg?react"
import RightArrow from "../assets/icons/right-arrow.svg?react"
import Lupa from "../assets/icons/search.svg?react"
import React from "react";
import {useQuery} from '@tanstack/react-query'
import { api } from "../api/api";
import type { IconNames } from "../components/icons";
import { useNavigate } from "react-router-dom";

    const categoryMap: Record<string, keyof typeof IconNames> = {
        "food": "Alimentação",
        "hosting": "Hospedagem",
        "transport": "Transporte",
        "services": "Serviços",
        "other": "Outros",
    }

export default function HomePage() {

    const [page, setPage] = React.useState(1)
    const [search, setSearch] = React.useState('')

    const navigate = useNavigate()

    const {data, isLoading} = useQuery({
        queryKey: ['refunds', page, search],
        queryFn: () => api.get('/refunds', {params: {page, q: search || undefined}})
        .then(res => res.data.refunds)
    })

    const pages = data?.meta.lastPage ?? 1

    return (
        <div className="flex w-full justify-center py-10 px-4 md:px-20">
            <Card title="Solicitações" className="w-full gap-1 min-h-210">

                <div className="flex w-full gap-2 items-center">
                    <div className="flex-1 min-w-0">
                    <Input 
                        placeholder="Pesquisar pelo nome" 
                        value={search} onChange={(e) => 
                        setSearch(e.target.value)}
                    />
                    </div>

                    <Button icon disabled>
                    <Lupa className="fill-white w-5"/>
                    </Button>
                
                </div>
                
                <div className="flex-1 flex flex-col gap-4">
                {(data?.data ?? []).map(item => 
                    <Item key={item.id}
                    nome={item.title}
                    valor={item.value}
                    variant={categoryMap[item.category]}
                    onClick={() => navigate(`/refunds/${item.id}`)}
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