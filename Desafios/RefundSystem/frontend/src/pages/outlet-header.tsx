import { Outlet } from "react-router-dom";
import Logo from '../assets/logo/Logo.svg?react'
import Button from "../components/button";
import MainContent from "../components/main-content";

export default function MainHeader() {
    return (
        <>
            <div className="flex items-center justify-between pt-10 px-15 pr-30">
                <Logo/>

                <div className="flex gap-2">
                    <Button className="min-w-fit p-2 bg-transparent hover:bg-transparent">
                        <span className="text-green-100">Solicitações de reembolso</span>
                    </Button>
                    <Button className="min-w-fit p-4"> 
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