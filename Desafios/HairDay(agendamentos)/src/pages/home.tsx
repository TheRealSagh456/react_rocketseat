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

const morningHours = ["09:00","10:00","11:00","12:00"]
const afternoonHours = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]
const nightHours = ["19:00","20:00","21:00", "22:00"]

export default function HomePage() {
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
                    <InputText containerClassName="scale-85" type="date" icon={calendar}/>

                </div>

                {/* Horarios */}
                <div>
                  <Text variant="title-md">Horários</Text>

                    {/* Manhã */}
                    <div className="mt-2 mb-4">
                        <Text variant="text-md">Manhã</Text>

                        <div className="flex flex-wrap gap-2 mt-1">
                            {morningHours.map((hour) => <p><TimeButton key={hour}>{hour}</TimeButton></p>)}
                        </div>
                    </div>
                    
                    {/* Tarde */}
                    <div className="mt-2 mb-4">
                        <Text variant="text-md">Tarde</Text>
                        
                        <div className="flex flex-wrap gap-2 mt-1 mr-10">
                            {afternoonHours.map((hour) => <p><TimeButton key={hour}>{hour}</TimeButton></p>)}
                        </div>
                        
                    </div>
                    
                    {/* Noite */}
                    <div className="mt-2 mb-4">
                    
                        <Text variant="text-md">Noite</Text>

                        <div className="flex flex-wrap gap-2 mt-1">
                            {nightHours.map((hour) => <p><TimeButton key={hour}>{hour}</TimeButton></p>)}
                        </div>

                        </div>
                </div>

                {/* Cliente */}
                <div>
    
                <Text variant="title-md">Cliente</Text>

                    <InputText containerClassName="scale-85 mt-2 mb-9 w-0" className="w-100" placeholder="Samuel Campos" type="text" icon={profile}/>

                <Button className="">
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
                        <Text variant="title-lg">Sua agenda</Text>
                        <Text variant="text-sm">Consulte os seus cortes de cabelo agendados por dia</Text>
                    </div>

                    <div>
                        <InputText containerClassName="scale-85" type="date" icon={calendar}/>
                    </div>

                </div>

                {/* Cards */}
                <div className="flex flex-col gap-8">

                <Card icon={sun} title="Manhã" period="9h-12h">
                {"waaaaaa"}
                </Card>
                <Card icon={cloud} title="Tarde" period="12h-18h">
                {"waaaaaa"}
                </Card>
                <Card icon={moon} title="Noite" period="18h-22h">
                {"waaaaaa"}
                </Card>

                </div>

            </div>

        </div>        

    )
}