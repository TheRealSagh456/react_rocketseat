import { styles } from "./styles";
import { TextInputProps, TextInput  } from "react-native";


export function Input({...props}: TextInputProps) {

    return (
        <TextInput style={styles.container} {...props} placeholderTextColor="#74798B"/>
    )
}