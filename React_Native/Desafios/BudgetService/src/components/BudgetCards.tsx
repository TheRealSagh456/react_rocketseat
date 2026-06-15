import { MaterialIcons } from "@expo/vector-icons"
import { View } from "react-native"
import { styles } from "./styles"
import { Text } from "react-native"

type Props = {
    icon?: keyof typeof MaterialIcons.glyphMap
    title: string,
    children: React.ReactNode
    total?: boolean
}

export default function BudgetCards({icon, title, children, total}: Props) {
    return (
        <View style={total ? styles.budgetCards : {
            flex: 1,
            borderWidth: 1,
            borderRadius: 8,
            flexDirection: "column",
            gap: 4,
            paddingVertical: 15
        }}>
            <View style={
                total ? {
                    flexDirection: "row", 
                    paddingHorizontal: 15, 
                    gap: 4, 
                    alignItems: 'center',
                    paddingTop: 12,
                } 
                    : {
                    flexDirection: "row", 
                    paddingHorizontal: 15, 
                    gap: 4, 
                    alignItems: 'center'
                }
            }>
                {icon 
                ? 
                <>
                    <MaterialIcons name={icon} size={24} color={'purple'}/>
                    <Text style={{color: 'gray'}}>{title}</Text>
                </>
                : 
                <Text style={{color: 'gray'}}>{title}</Text>
}
                
            </View>

            <View style={styles.divider}/>
            
            <View style={{flexDirection: "column", gap: 10}}>
                {children}
            </View>
        </View>
    )
}