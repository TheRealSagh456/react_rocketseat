import Badge from "../assets/components/badge";
import Button from "../assets/components/button";
import ButtonIcon from "../assets/components/button-icon";
import Card from "../assets/components/card";
import InputCheckbox from "../assets/components/check-box";
import Container from "../assets/components/container";
import Icon from "../assets/components/icon";
import InputText from "../assets/components/input-text";
import Skeleton from "../assets/components/skeleton";
import Text from '../assets/components/text'
import TrashIcon from '../assets/icons/Trash-Regular.svg?react'
import CheckIcon from '../assets/icons/Check-Regular.svg?react'
import PencilIcon from '../assets/icons/PencilSimple-Regular.svg?react'
import PlusIcon from '../assets/icons/Plus-Regular.svg?react'
import SpinnerIcon from '../assets/icons/Spinner.svg?react'
import XIcon from '../assets/icons/X-Regular.svg?react'

export default function PageComponents() {
      
  return(

    <Container>
  
  <div className="grid gap-10">
    <div className="flex flex-col gap-2">
      <Text variant={"body-sm-bold"} className="text-pink-base">
      Olá Mundo!
      </Text>
      <Text className="text-green-base">
      Olá Mundo!
      </Text>
      <Text variant={"body-md-bold"}>
      Olá Mundo!
      </Text>
    </div>
    
    <div className="flex gap-1">
    <Icon svg={TrashIcon} className="fill-green-base"/>
    <Icon svg={CheckIcon} className="fill-gray-300"/>
    <Icon svg={PencilIcon} className="fill-pink-base"/>
    <Icon svg={PlusIcon}/>
    <Icon svg={SpinnerIcon} animate/>
    <Icon svg={XIcon}/>
    </div>
    
    <div className="flex gap-1">
    <Badge loading>5</Badge>
    <Badge variant="secondary">5</Badge>
    <Badge variant="primary">2 de 5</Badge>
    </div>

    <div className="flex gap-4">
      <Button variant={"primary"} icon={PlusIcon}>Nova tarefa</Button>
      <Button variant={"primary"} icon={PlusIcon} handling>Criando...</Button>  
    </div>

    <div className="flex gap-1">
    <ButtonIcon icon={TrashIcon} loading/>
    <ButtonIcon icon={TrashIcon} />
    <ButtonIcon icon={TrashIcon} variant='secondary'/>
    <ButtonIcon icon={TrashIcon} variant='tertiary'/>
    <ButtonIcon icon={TrashIcon} variant='tertiary' handling/>
    </div>
  
    <div>
    <InputText/>
    </div>

    <div className="flex flex-1 gap-3">
      <InputCheckbox loading disabled={true}/>
      <InputCheckbox />
    </div>

    <div>
      <Card size="md" className="w-100">Olá Mundo</Card>
    </div>

    <div className='space-y-2'>
      <Skeleton className="h-6"/>
      <Skeleton className="h-6"/>
      <Skeleton className='w-96 h-6'/>
    </div>  
  
  </div>
  </Container>
  
  )

}