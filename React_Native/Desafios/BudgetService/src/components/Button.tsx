import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { styles } from "./styles";

export type Props = TouchableOpacityProps & {
    variant: "purple" | "gray" 
}

export function Button({variant, children, ...props}: Props) {
    return (
        <TouchableOpacity {...props}>
            
            {
            variant === "purple" &&
            
                <View style={styles.buttonContainerV1}>
                    {children}
                </View>
            }
            {
            variant === "gray" &&
                <View style={styles.buttonContainerV2}>
                    {children}
                </View>
          
            }
        </TouchableOpacity>
    )
}