import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Button, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native";

export enum InputTypes {
    text = "text",
    qty = "qty",
    money = "money",
    percentage = "percentage"
}

type Props = TextInputProps & {
    variant: InputTypes
    icon?: keyof typeof MaterialIcons.glyphMap,
    containerStyle?: ViewStyle
}

export function Input({variant, icon, containerStyle, ...props} : Props) {
    const [qty, setQty] = React.useState(1)

    return (
        <View 
        style={[{
            flexDirection: 'row',
            alignItems: props.multiline ? 'flex-start' : 'center',
            borderWidth: 1,
            borderRadius: 25,
            borderColor: '#E6E5E5',
            paddingHorizontal: 12,
            backgroundColor: '#FAFAFA',
        }, containerStyle]}>
            {variant === InputTypes.text && (
                icon ? 
                <>
                    <MaterialIcons name={icon} size={25} color={'gray'}/>
                    <TextInput 
                        placeholderTextColor="#A1A2A1"
                        style={{
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            color: 'black',
                            textAlignVertical: props.multiline ? "top" : "center"
                        }}
                        {...props}
                    />
                </>
                : 
                <TextInput 
                    placeholderTextColor="#A1A2A1"
                    style={{
                        flex: 1,
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            color: 'black'
                    }}
                    {...props}
                />
            )}

            {variant === InputTypes.money && (
                icon ? 
                <>
                    <MaterialIcons name={icon} size={25} color={'#A1A2A1'}/>
                    <TextInput 
                        placeholderTextColor="#A1A2A1"
                        style={{
                            flex: 1,
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            color: 'black'
                        }}
                        {...props}
                        keyboardType="numeric"
                        />

                </>
                :
                <>
                    <Text style={{fontWeight: 600}}>R$</Text>
                    <TextInput 
                    style={{
                        flex: 1,
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            color: 'black'
                    }}
                    {...props}
                    keyboardType="numeric"
                    
                    />
                </>
            )}

            {variant === InputTypes.percentage && (
                <>
                    <TextInput 
                    style={{
                        flex: 1,
                            paddingVertical: 4,
                            paddingHorizontal: 4,
                            color: 'black',
                            alignItems: 'center',
                            justifyContent: 'center'
                    }}
                    {...props}
                    keyboardType="numeric"
                    />
                    <Text style={{fontWeight: 600}}>%</Text>
                </>
                )}
        </View>
    )
}