import { useNavigation } from "@react-navigation/native";
import { Button, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
    const navigation = useNavigation()

    return (
        <View style={{flexDirection: "row", paddingTop: 54, paddingHorizontal: 30, gap: 60, backgroundColor: 'white', paddingBottom: 15}}>
            <View style={{flexDirection: "column"}}>
                <Text style={{color: "purple", fontWeight: 500}}>Orçamentos</Text>
                <Text style={{color: "gray"}}>Você tem 1 item em rascunho</Text>
            </View>
            <TouchableOpacity>
                <Button title="+ Novo" onPress={() => navigation.navigate("Orçamento")}/>
            </TouchableOpacity>
        </View>
    )
}