import { useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { QuoteDocTypes } from "@/types";
import Status from "./status";

type Props = {
    id?: string
    quote?: QuoteDocTypes
}

export default function QuoteHeader({id, quote}: Props) {
    const navigation = useNavigation()
    
    return (
        <View style={!quote ? {
            flexDirection: "row", 
            paddingTop: 54, 
            backgroundColor: 'white', 
            paddingBottom: 15, 
            gap: 5,
            alignItems: 'center',
            paddingLeft: 8
        } : {
            flexDirection: "row", 
            paddingTop: 54, 
            alignItems: 'center', 
            backgroundColor: 'white', 
            paddingBottom: 15, 
            justifyContent: "space-between",
            paddingRight: 20
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 8, gap: 5}}>
                <Pressable onPress={() => navigation.goBack()}>
                    <MaterialIcons name="chevron-left" size={40} color={'black'}/>
                </Pressable>
                <Text style={{color: "black", fontWeight: 700, fontSize: 18}}>{id ? `Orçamentos #${id}` : "Orçamentos"}</Text>
            </View>
            {quote && (
                <View>
                    <Status status={quote.status}/>
                </View>
            )}
        </View> 
    )
}