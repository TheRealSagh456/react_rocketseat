import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./style";
import { colors } from "@/theme";
import { ColorValue, Pressable, PressableProps, Text } from "react-native";

type Props = PressableProps & {
    isSelected: boolean
    title: string
    icon: keyof typeof MaterialIcons.glyphMap
    selectedColor: ColorValue
}

export function Option({
    isSelected,
    title,
    icon,
    selectedColor,
    ...props
}: Props) {
    return (
        <Pressable 
            style={[styles.option, isSelected && {backgroundColor: selectedColor}]} 
            {...props}
        >
            <MaterialIcons 
                name={icon} 
                size={24} 
                color={isSelected ? colors.white : colors.gray[500]}
            />
            <Text style={[styles.title, isSelected && {color: colors.white}]}>
                {title}
            </Text>
        </Pressable>
    )
}