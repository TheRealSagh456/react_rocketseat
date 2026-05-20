import Icon from "./assets/components/icon"
import Text from "./assets/components/text"
import TrashIcon from "./assets/icons/Trash-Regular.svg?react"
import CheckIcon from "./assets/icons/Check-Regular.svg?react"
import PencilIcon from "./assets/icons/PencilSimple-Regular.svg?react"
import PlusIcon from "./assets/icons/Plus-Regular.svg?react"
import SpinnerIcon from "./assets/icons/Spinner.svg?react"
import XIcon from "./assets/icons/X-Regular.svg?react"
import Badge from "./assets/components/badge"
import Button from "./assets/components/button"

export default function App() {
  
  return(
  <div className="grid gap-3">
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
    
    <div>
    <Badge variant="secondary">5</Badge>
    <Badge variant="primary">2 de 5</Badge>
    </div>

    <div>
      <Button variant={"primary"} icon={PlusIcon}>Nova tarefa</Button>
    </div>
  
  </div>
  )
  }
