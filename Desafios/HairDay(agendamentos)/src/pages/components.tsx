import React from "react"
import Text from "../components/text"
import Icon from "../components/icon"
import Button from "../components/button"
import IconButton from "../components/icon-button"
import InputText from "../components/input-text"
import TimeButton from "../components/time-button"
import Card from "../components/card"
import calendar from "../assets/icons/calendar.svg?react"
import cloud from "../assets/icons/cloud.svg?react"
import downArrow from "../assets/icons/down-arrow.svg?react"
import leftSideArrow from "../assets/icons/left-side-arrow.svg?react"
import moon from "../assets/icons/moon.svg?react"
import profile from "../assets/icons/profile.svg?react"
import rightSideArrow from "../assets/icons/right-side-arrow.svg?react"
import sun from "../assets/icons/sun.svg?react"
import trash from "../assets/icons/trash.svg?react"

export default function PageComponents() {
      const [selectedHour, setSelectedHour] = React.useState(``)

  return (
    <div className="flex p-4 gap-6 flex-col">
    
    <div className="flex flex-col gap-4 p-7">
    <Text variant={"title-lg"}>Hello World!</Text>
    <Text variant={"title-md"}>Olá mundo!</Text>
    <Text variant={"title-sm"}>Hola mundo!</Text>
    <Text variant={"text-md"}>Bonjour le monde!</Text>
    <Text variant={"text-sm"}>{`Lorem ipsum dolor sit amet >:(`}</Text>
    </div>
    
    <div className="fill-yellow-light flex p-7 gap-4">
    <Icon svg={calendar}/>
    <Icon svg={cloud}/>
    <Icon svg={downArrow}/>
    <Icon svg={leftSideArrow}/>
    <Icon svg={rightSideArrow}/>
    <Icon svg={moon}/>
    <Icon svg={sun}/>
    <Icon svg={profile}/>
    <Icon svg={trash}/>
    </div>

    <div className="flex p-5 gap-4">
      <Button> 
        <Text variant="title-sm" className="text-gray-900">
          AGENDAR
        </Text> 
      </Button>
      
      <Button disabled>
        <Text variant="title-sm" className="text-gray-900">
          AGENDAR
        </Text> 
      </Button>
    
    </div>

    <div className="p-5">
    <IconButton icon={trash}/>
    </div>
    
    <div className="p-4">
      <InputText icon={profile} placeholder="Nome do Cliente"/>
    </div>
    
    <div className="flex p-4 gap-4">
      <TimeButton selected={selectedHour===`41:00`} onClick={() => setSelectedHour(`41:00`)}>41:00</TimeButton>
      <TimeButton selected={selectedHour=== `67:00`} onClick={() => setSelectedHour(`67:00`)}>67:00</TimeButton>
      <TimeButton selected={selectedHour===`69:00`} onClick={() => setSelectedHour(`69:00`)}>69:00</TimeButton>
      <TimeButton disabled selected={selectedHour===`00:00`} onClick={() => setSelectedHour(`00:00`)}>00:00</TimeButton>
    </div>

    <div className="flex flex-col gap-4">
      <Card icon={sun} period="9h-12h" title="Manhã">Nenhum agendamento para este período</Card>
      <Card icon={cloud} period="13h-18h" title="Tarde">Nenhum agendamento para este período</Card>
      <Card icon={moon} period="19h-22h" title="Noite">Nenhum agendamento para este período</Card>
    </div>

    <div>
      <InputText type="date" icon={calendar}/>
    </div>
    
    </div>
  )
}