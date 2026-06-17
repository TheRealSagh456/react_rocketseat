import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
    id?: string
}

export default function QuoteHeader({id}: Props) {
    const navigation = useNavigation()
    
    return (
        <View style={{flexDirection: "row", paddingTop: 54, alignItems: 'center', paddingLeft: 8, backgroundColor: 'white', paddingBottom: 15, gap: 5}}>
            <Pressable onPress={() => navigation.goBack()}>
                <MaterialIcons name="chevron-left" size={40} color={'black'}/>
            </Pressable>
            <Text style={{color: "black", fontWeight: 700, fontSize: 18}}>{id ? `Orçamentos #${id}` : "Orçamentos"}</Text>
        </View> 
    )
}