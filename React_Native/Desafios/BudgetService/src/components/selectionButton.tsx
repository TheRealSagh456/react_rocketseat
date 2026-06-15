import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type Props =  TouchableOpacityProps & {
    selected?: boolean,
    box?: boolean
}

export function RadioButton({selected, box, ...props}: Props) {
    return (
        <View style={[
            !selected && !box && {
            backgroundColor: 'white',
            width: 22,
            height: 22,
            borderRadius: 40,
            borderColor: 'gray',
            borderWidth: 1
        },  selected && !box && {
            backgroundColor: 'white',
            width: 22,
            height: 22,
            borderRadius: 40,
            borderColor: 'blue',
            borderWidth: 7
        }, !selected && box && {
            backgroundColor: 'white',
            width: 22,
            height: 22,
            borderRadius: 5,
            borderColor: 'gray',
            borderWidth: 1
        }, selected && box && {
            backgroundColor: 'blue',
            width: 22,
            height: 22,
            borderRadius: 5,
            borderColor: 'gray',
            borderWidth: 1
        }

        ]}>
            <TouchableOpacity style={{
                    width: 22,
                    height: 22,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} {...props}
            >

                {box && selected && <MaterialIcons name="check" color={'white'} size={15}/>}

            </TouchableOpacity>
        </View>
    )
}