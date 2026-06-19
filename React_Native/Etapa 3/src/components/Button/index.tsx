import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TouchableOpacityProps & {
    title: string,
    isProcessing?: boolean
}

export function Button({title, isProcessing=false, ...props}: Props) {
    return (
        <TouchableOpacity style={styles.container} {...props}>
            <Text style={styles.title}>
                {isProcessing ? (
                    <ActivityIndicator size={"small"} color={colors.white}/>
                ) : (
                    title
                )}
            </Text>
        </TouchableOpacity>
    )
}