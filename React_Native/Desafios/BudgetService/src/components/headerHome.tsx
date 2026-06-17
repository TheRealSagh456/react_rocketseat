import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "./Button";
import { MaterialIcons } from "@expo/vector-icons";
import { getQuoteByStatus } from "@/storage";
import { StatusTypes } from "@/types";
import React from "react";

export default function Header() {
    const navigation = useNavigation()

    const [rascunhoQuotes, setRascunhoQuotes] = React.useState<Number>(0)

    React.useEffect(() => {
        async function load() {
            const count = await getQuoteByStatus(StatusTypes.Rascunho)
            setRascunhoQuotes(count)
        }
        load()
    }, [])

    return (
        <View style={{flexDirection: "row", paddingTop: 54, paddingHorizontal: 30, gap: 60, backgroundColor: 'white', paddingBottom: 15}}>
            <View style={{flexDirection: "column"}}>
                <Text style={{color: "#6A46EB", fontWeight: 500}}>Orçamentos</Text>
                <Text style={{color: "gray"}}>{`Você tem ${rascunhoQuotes} item em rascunho`}</Text>
            </View>
                <Button variant="purple" onPress={() => navigation.navigate("Orçamento")}>
                    <MaterialIcons name="add" size={25} color={'white'}/>
                    <Text style={{fontSize: 16, color: 'white'}}>Novo</Text>    
                </Button>
        </View>
    )
}