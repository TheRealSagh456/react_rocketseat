import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import BudgetCards from "@/components/BudgetCards";
import { MaterialIcons } from "@expo/vector-icons";
import Status from "@/components/status";

export default function QuoteForm() {
    const navigation = useNavigation()

    return (

        <ScrollView>
            <View style={styles.container}>    
                    <BudgetCards title="Informações gerais" icon={"store"}>
                        <TextInput 
                            placeholder='Título ou cliente'
                            placeholderTextColor="gray"
                            style={{
                            borderWidth: 1,
                            height: 50,
                            marginHorizontal: 16,
                            paddingHorizontal: 12,
                            borderRadius: 25,
                            }}
                        />
                        <TextInput
                            placeholder='Título ou cliente'
                            placeholderTextColor="gray"
                            style={{
                            borderWidth: 1,
                            height: 50,
                            marginHorizontal: 16,
                            paddingHorizontal: 12,
                            borderRadius: 25,
                            }}
                        />
                    </BudgetCards>

                    <BudgetCards title="Status" icon={"sell"}>
                        
                        <View style={{justifyContent: 'space-between', marginHorizontal: 30, flexDirection:"row", gap:40}}>
                            <Status status="Rascunho"/>
                            <Status status="Aprovado"/>
                        </View>
                        <View style={{justifyContent: 'space-between', marginHorizontal: 30, flexDirection:"row", gap:40}}>
                            <Status status="Enviado"/>
                            <Status status="Recusado"/>
                        </View>
                    </BudgetCards>

                    <BudgetCards title="Serviços inclusos" icon={"receipt-long"}>
                        <TextInput 
                            placeholder='Título ou cliente'
                            placeholderTextColor="gray"
                            style={{
                            borderWidth: 1,
                            height: 50,
                            marginHorizontal: 16,
                            paddingHorizontal: 12,
                            borderRadius: 25,
                            }}
                        />
                        <TextInput
                            placeholder='Título ou cliente'
                            placeholderTextColor="gray"
                            style={{
                            borderWidth: 1,
                            height: 50,
                            marginHorizontal: 16,
                            paddingHorizontal: 12,
                            borderRadius: 25,
                            }}
                        />
                    </BudgetCards>

                    <BudgetCards title="Investimento" icon={"attach-money"} total>
                        <View style={{flexDirection: 'column'}}>
                            <View style={{paddingBottom: 10, paddingHorizontal: 10,}}>
                                <View>
                                    <Text>Subtotal</Text>
                                </View>
                                
                                <View>
                                    <Text>Desconto</Text>
                                </View>
                            </View>
                            
                            <View style={{
                                    backgroundColor: '#E6E5E5', 
                                    paddingVertical: 18,
                                    flexDirection: "row", 
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                    paddingRight: 20,
                                    alignItems: 'center',
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8
                                }}>
                                <Text style={{fontWeight: 600}}>
                                    Valor total
                                </Text>
                            
                                <View>
                                    <Text style={{marginLeft: 10, textDecorationLine: "line-through"}}>R$ 23.823,23</Text>
                                    <Text style={{fontWeight: 700}}>R$ 20.000,00</Text>
                                </View>
                            </View>
                        </View>
                    </BudgetCards>
                    
                
                <View style={{flexDirection: "row", gap: 15, justifyContent: 'center'}}>
                    <Button title="apagar" onPress={() => navigation.goBack()}/>
                    <Button title="Salvar" onPress={() => navigation.navigate("details")}/>
                </View>
            </View>
        </ScrollView>
    )
}