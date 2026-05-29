import Icon from "../components/icon";
import Text from "../components/text";
import logo from "../assets/image/Logo.svg?react"
import InputText from "../components/input-text";
import calendar from "../assets/icons/calendar.svg?react"
import profile from "../assets/icons/profile.svg?react"
import Button from "../components/button";
import TimeButton from "../components/time-button";
import Card from "../components/card";
import sun from "../assets/icons/sun.svg?react"
import cloud from "../assets/icons/cloud.svg?react"
import moon from "../assets/icons/moon.svg?react"
import React from "react";
import IconButton from "../components/icon-button";
import trash from "../assets/icons/trash.svg?react"


export default function HomePage() {

    const morningHours = ["09:00","10:00","11:00","12:00"]
    const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
    const nightHours = ["19:00","20:00","21:00", "22:00"]

    const [selectedHour, setSelectedHour] = React.useState("")
    const [selectedDate, setSelectedDate] = React.useState("")
    const [clientName, setClientName] = React.useState("")

    const[searchByDate, setSearchByDate] = React.useState("")

    const [horariosOcupados, setHorariosOcupados] = React.useState<{
        id: string
        data: string,
        horario: string,
        cliente: string
    }[]>(() => {
        const localst = localStorage.getItem("horariosOcupados")
        return localst ? JSON.parse(localst) : []
    })

    React.useEffect(() => {
        localStorage.setItem("horariosOcupados", JSON.stringify(horariosOcupados))
    }, [horariosOcupados])

    function getSearchByDate(period: "manha" | "tarde" | "noite") {   

        const periodos = {
            manha: ["09:00", "10:00", "11:00", "12:00"],
            tarde: ["13:00","14:00","15:00","16:00","17:00","18:00"],
            noite: ["19:00","20:00","21:00","22:00"]
        } 

        return horariosOcupados.filter((item) => item.data === searchByDate && periodos[period].includes(item.horario) )
    }

    const agendamentosManha = getSearchByDate('manha')
    const agendamentosTarde = getSearchByDate('tarde')
    const agendamentosNoite = getSearchByDate('noite')

    return (
        <div className="relative p-5 flex">
        
            {/* Logo */} 
            <div className="absolute top-0 left-0 ml-51">
                <div className="flex items-center justify-center w-33 h-14 bg-gray-600 rounded-br-lg">
                    <Icon svg={logo}/>
                </div> 
            </div>
            
            {/* Formulário */}
            
            <div className="mx-50 flex flex-col gap-4 w-125 bg-gray-700 pl-18 rounded-xl pb-20">
        
                {/* Titulo */}
                <div className="flex flex-col mt-8 mb-3">
                    
                    <Text variant="title-lg" className="mt-9">
                        Agende um atendimento 
                    </Text>

                    <Text variant="text-sm" className="mt-2">
                        Selecione a data, horário e informe o nome do cliente para <br/> criar o agendamento
                    </Text>

                </div>

                {/* Data */}
                <div>
                    
                    <Text className="" variant="title-md">
                        Data
                    </Text>
                    
                    <InputText containerClassName="scale-85 w-0" className="w-100" type="date" icon={calendar} onChange=
                        {
                            (e) => {
                                (setSelectedDate(e.target.value))
                                setSelectedHour("")
                            }
                        }
                    />
                
                </div>

                {/* Horarios */}
                <div>
                  
                    <Text variant="title-md">
                        Horários
                    </Text>

                    {/* Manhã */}
                    <div className="mt-2 mb-4">
                        <Text variant="text-md">Manhã</Text>

                        <div className="flex flex-wrap gap-2 mt-1">
                            {
                                morningHours.map((hour) => {
                                    
                                        const isReserved = horariosOcupados.some(
                                        (item) => item.data === selectedDate && item.horario === hour
                                    )
                                    
                                    return (
                                <TimeButton key={hour} selected={selectedHour === hour} disabled={isReserved} onClick=
                                    {
                                        () => setSelectedHour(hour)
                                    }
                                >
                                    {hour}
                                </TimeButton>)})
                            }
                        </div>
                  
                    </div>
                    
                    {/* Tarde */}
                    <div className="mt-2 mb-4">
                        
                        <Text variant="text-md">
                            Tarde
                        </Text>
                        
                        <div className="flex flex-wrap gap-2 mt-1 mr-10">
                            {
                                afternoonHours.map((hour) => {

                                    const isReserved = horariosOcupados.some(
                                        (item) => item.data === selectedDate && item.horario === hour
                                    )
                                    
                                    return (
                                    <TimeButton key={hour} selected={selectedHour === hour} disabled={isReserved} onClick=
                                        {
                                        () => setSelectedHour(hour)
                                        }
                                    >
                                        {hour}
                                    </TimeButton>)
                                    })
                            }
                        </div>
                        
                    </div>
                    
                    {/* Noite */}
                    <div className="mt-2 mb-4">
                    
                        <Text variant="text-md">
                            Noite
                        </Text>

                        <div className="flex flex-wrap gap-2 mt-1">
                            {   
                            
                                nightHours.map((hour) => {
                                    
                                    const isReserved = horariosOcupados.some(
                                        (item) => item.data === selectedDate && item.horario === hour
                                    )
                                    
                                    return (
                                    <TimeButton key={hour} selected={selectedHour === hour} disabled={isReserved}onClick=
                                            {
                                                () => setSelectedHour(hour)
                                            }
                                        >
                                            {hour}
                                        </TimeButton>
                                    )}
                                )
                            }
                        </div>

                    </div>

                </div>

                {/* Cliente */}
                <div>
    
                    <Text variant="title-md">
                        Cliente
                    </Text>

                    <InputText containerClassName="scale-85 mt-2 mb-9 w-0" className="w-100" placeholder="Samuel Campos" type="text" 
                    icon={profile} value={clientName} onChange={(e) => (setClientName(e.target.value))}
                    />

                    <Button disabled={clientName == "" || selectedDate == "" || selectedHour == ""} 
                            onClick=
                        {
                            () => {

                                setHorariosOcupados(prev => [
                                ...prev, {id: String(Date.now()), cliente: clientName, data: selectedDate, horario: selectedHour}
                                ])
                                setClientName("")
                                setSelectedHour("")

                            }
                        }
                    >
                        <Text variant="title-md" className="text-gray-900">
                            AGENDAR
                        </Text>
                    </Button>

                </div>
            
            </div>

            {/* Reservas */}
            <div className="flex flex-col mt-20 gap-3">

                {/* Titulo + data */}  
                <div className="flex gap-20">
                    
                    <div className="flex flex-col gap-1">
                        <Text variant="title-lg">
                            Sua agenda
                        </Text>
                        <Text variant="text-sm">
                            Consulte os seus cortes de cabelo agendados por dia
                        </Text>
                    </div>

                    <div>
                        <InputText containerClassName="scale-85" type="date" icon={calendar} onChange=
                            {
                                (e) => {
                                    setSearchByDate(e.target.value)
                                }
                            }
                        />
                    </div>

                </div>

                {/* Cards */}
                <div className="flex flex-col gap-8">

                    <Card icon={sun} title="Manhã" period="9h-12h">
                        {
                            agendamentosManha.length > 0 
                            ?
                            agendamentosManha.map((item, index) =>
                                <div key={index} className="flex justify-between my-1 mr-2">
                                    <div className="flex gap-7">
                                        <Text variant="title-md">{item.horario}</Text>
                                        <Text className= "pt-0.75" variant="text-sm">{item.cliente}</Text>
                                    </div>
                                    <IconButton icon={trash} className="pb-5 scale-85" 
                                        onClick={() => setHorariosOcupados(tudo => tudo.filter(Remanescentes => Remanescentes.id !== item.id))}
                                    />
                                </div>
                            ) 
                            :
                            "Nenhum agendamento para este período"
                        }
                    </Card>
                    
                    <Card icon={cloud} title="Tarde" period="12h-18h">
                        {
                            agendamentosTarde.length > 0 
                            ?
                            agendamentosTarde.map((item, index) =>
                                <div key={index} className="flex justify-between my-1 mr-2">
                                    <div className="flex gap-7">
                                        <Text variant="title-md">{item.horario}</Text>
                                        <Text className= "pt-0.75" variant="text-sm">{item.cliente}</Text>
                                    </div>
                                    <IconButton icon={trash} className="pb-5 scale-85" 
                                        onClick={() => setHorariosOcupados(tudo => tudo.filter(Remanescentes => Remanescentes.id !== item.id))}
                                    />
                                </div>
                            ) 
                            :
                            "Nenhum agendamento para este período"
                        }
                    </Card>
                    
                    <Card icon={moon} title="Noite" period="18h-22h">
                        {
                            agendamentosNoite.length > 0 
                            ?
                            agendamentosNoite.map((item, index) =>
                                <div key={index} className="flex justify-between my-1 mr-2">
                                    <div className="flex gap-7">
                                        <Text variant="title-md">{item.horario}</Text>
                                        <Text className= "pt-0.75" variant="text-sm">{item.cliente}</Text>
                                    </div>
                                    <IconButton icon={trash} className="pb-5 scale-85" 
                                        onClick={() => setHorariosOcupados(tudo => tudo.filter(Remanescentes => Remanescentes.id !== item.id))}
                                    />
                                </div>
                            ) 
                            :
                            "Nenhum agendamento para este período"
                        }
                    </Card>

                </div>

            </div>

        </div>        

    )
}