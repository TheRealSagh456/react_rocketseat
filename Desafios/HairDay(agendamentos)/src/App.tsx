import Text from "./components/text";

export default function App() {

  return (
    <div className="flex flex-col gap-4 p-7">
    <Text variant={"title-lg"}>Hello World!</Text>
    <Text variant={"title-md"}>Did you know</Text>
    <Text variant={"title-sm"}>that everybody</Text>
    <Text variant={"text-md"}>wants to</Text>
    <Text variant={"text-sm"}>rule you?</Text>
    </div>
  )
}
