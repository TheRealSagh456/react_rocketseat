import { useParams } from "react-router";
import Text from "../components/text";


export default function PagePhotoDetails() {
    const {id} = useParams()


    return <>
        <Text variant="heading-medium">Detalhe da Foto</Text>
        <hr />
        <Text variant="heading-medium">ID da Foto: {id}</Text>
        
    </>
}