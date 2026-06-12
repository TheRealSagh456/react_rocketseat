import { StatusTypes } from "@/types"
import { Text, View } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

type Props = {
    status: keyof typeof StatusTypes
}

export default function Status({status}: Props) {
    return (
        <View>
            {/* Preciso de um botão que imite um radius */}
            {
                status === StatusTypes.Aprovado && (
                    <View style={{
                        backgroundColor: '#BFF7BE', 
                        borderRadius: 5, 
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        gap: 4
                    }}>
                        <FontAwesome name="circle" color={'#4BB84A'} size={10} style={{paddingTop: 5}}/> 
                        <Text style={{color: '#4BB84A', fontWeight: 500}}>Aprovado</Text>
                    </View>
                )
                
            }
            {
                status === StatusTypes.Recusado && (
                    <View style={{
                        backgroundColor: '#FFD6D6', 
                        borderRadius: 5, 
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        gap: 4
                    }}>
                        <FontAwesome name="circle" color={'#DB4D4D'} size={10} style={{paddingTop: 5}}/> 
                        <Text style={{color: '#DB4D4D', fontWeight: 500}}>Recusado</Text>
                    </View>
                )
                
            }
            {
                status === StatusTypes.Enviado && (
                    <View style={{
                        backgroundColor: '#CEEFFF', 
                        borderRadius: 5, 
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        gap: 4
                    }}>
                        <FontAwesome name="circle" color={'#2AA1D9'} size={10} style={{paddingTop: 5}}/> 
                        <Text style={{color: '#2AA1D9', fontWeight: 500}}>Enviado</Text>
                    </View>
                )
                
            }
            {
                status === StatusTypes.Rascunho && (
                    <View style={{
                        backgroundColor: '#E6E5E5', 
                        borderRadius: 5, 
                        flexDirection: 'row',
                        paddingHorizontal: 8,
                        paddingVertical: 2,
                        justifyContent: 'space-between',
                        alignContent: 'center',
                        gap: 4
                    }}>
                        <FontAwesome name="circle" color={'#A1A2A1'} size={10} style={{paddingTop: 5}}/> 
                        <Text style={{color: '#A1A2A1', fontWeight: 500}}>Rascunho</Text>
                    </View>
                )
                
            }
        </View>
    )
}