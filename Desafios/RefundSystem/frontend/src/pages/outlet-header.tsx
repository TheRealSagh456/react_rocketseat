import { Outlet, useNavigate } from "react-router-dom";
import Logo from '../assets/logo/Logo.svg?react'
import Button from "../components/button";
import MainContent from "../components/main-content";

export default function MainHeader() {
    const navigate = useNavigate()

    return (
        <>
            <div className="flex items-center justify-between pt-10 px-15 pr-30">

                <Logo/>

                <div className="flex gap-2">
                    
                        <Button className="min-w-fit p-2 bg-transparent hover:bg-transparent" onClick={() => navigate("/")}>
                            <span className="text-green-100">Solicitações de reembolso</span>
                        </Button>
                    
                        <Button className="min-w-fit p-4" onClick={() => navigate("/new-refund")}>
                            <span className="font-bold">
                                Nova solicitação
                            </span>
                        </Button>
                   
                </div>
            </div>
            
            <MainContent>
                <Outlet/>
            </MainContent>
        </>
    )
}