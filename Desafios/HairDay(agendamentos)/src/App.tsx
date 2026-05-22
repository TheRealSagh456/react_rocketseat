import Icon from "./components/icon";
import Text from "./components/text";
import calendar from "../src/assets/icons/calendar.svg?react"
import cloud from "../src/assets/icons/cloud.svg?react"
import downArrow from "../src/assets/icons/down-arrow.svg?react"
import leftSideArrow from "../src/assets/icons/left-side-arrow.svg?react"
import moon from "../src/assets/icons/moon.svg?react"
import profile from "../src/assets/icons/profile.svg?react"
import rightSideArrow from "../src/assets/icons/right-side-arrow.svg?react"
import sun from "../src/assets/icons/sun.svg?react"
import trash from "../src/assets/icons/trash.svg?react"


export default function App() {

  return (
    <div>
    
    <div className="flex flex-col gap-4 p-7">
    <Text variant={"title-lg"}>Hello World!</Text>
    <Text variant={"title-md"}>Did you know</Text>
    <Text variant={"title-sm"}>that everybody</Text>
    <Text variant={"text-md"}>wants to</Text>
    <Text variant={"text-sm"}>rule you?</Text>
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
    
    </div>
  )
}
