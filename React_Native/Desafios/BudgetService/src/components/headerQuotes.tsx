import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import {MaterialIcons as Icon} from "@expo/vector-icons"

export default function HeaderButtonToHome() {
    const navigation = useNavigation()
    
    return (
        <Pressable onPress={() => navigation.reset({ index: 0, routes: [{ name: "home" }],
})}>
            <Icon name="chevron-left" size={24} color={"#000"}/>
        </Pressable>
    )
}