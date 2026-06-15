import { useNavigation } from "@react-navigation/native";
import { Button, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import BudgetCards from "@/components/BudgetCards";
import { MaterialIcons } from "@expo/vector-icons";
import Status from "@/components/status";
import { RadioButton } from "@/components/selectionButton";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, InputTypes } from "@/components/Input";
import { TouchableOpacity } from "react-native";
import { ItemTypes } from "@/types";
import { FlatList } from "react-native";

export default function QuoteForm() {
    const navigation = useNavigation()

    const [budgetTitle, setBudgetTitle] = React.useState('')
    const [budgetClient, setBudgetClient] = React.useState('')
    const [selectedRadio, setSelectedRadio] = React.useState('')
    const [services, setServices] = React.useState<ItemTypes[]>([])

    const [addService, setAddService] = React.useState(false)
    const [serviceTitle, setServiceTitle] = React.useState('')
    const [serviceDescription, setServiceDescription] = React.useState('')
    const [servicePrice, setServicePrice] = React.useState(0)
    const [ServiceQty, setServiceQty] = React.useState(1)
    const [discount, setDiscount] = React.useState(0)

    const insets = useSafeAreaInsets()

    const subtotal = React.useMemo(() => {
        return services.reduce((tt, item) => tt + (item.price*item.qty), 0)
    }, [services])

    const totalServices = React.useMemo(() => {
        return services.length
    }, [services])

    function handleSubmit() {

    }

    return (
        <>
            <ScrollView>
                <View style={styles.container}>  

                        <BudgetCards title="Informações gerais" icon={"store"}>
                            <View style={{paddingHorizontal: 20}}>
                                <Input
                                variant={InputTypes.text} 
                                placeholder='Título'
                                placeholderTextColor="gray"
                                onChangeText={setBudgetTitle}
                            />
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Input
                                variant={InputTypes.text} 
                                placeholder='Cliente'
                                placeholderTextColor="gray"
                                onChangeText={setBudgetClient}
                            />
                            </View>
                        </BudgetCards>

                        <BudgetCards title="Status" icon={"sell"}>

                            <View style={{flexDirection: 'row'}}>
                            
                                <View style={{justifyContent: 'center', marginHorizontal: 30, flexDirection:"column", gap:20}}>
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}>
                                        <RadioButton 
                                        onPress={() => setSelectedRadio('Rascunho')}
                                        selected={selectedRadio === 'Rascunho'}
                                        />
                                        <Status status="Rascunho"/>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}>
                                        <RadioButton 
                                        onPress={() => setSelectedRadio('Aprovado')}
                                        selected={selectedRadio === 'Aprovado'}
                                        />
                                        <Status status="Aprovado"/>
                                    </View>
                                </View>
                                <View style={{
                                    justifyContent: 'center', 
                                    marginRight: 30, 
                                    flexDirection:"column", 
                                    gap:20
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}>
                                        <RadioButton 
                                        onPress={() => setSelectedRadio('Enviado')}
                                        selected={selectedRadio === 'Enviado'}
                                        />
                                        <Status status="Enviado"/>    
                                    </View>
                                    
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}>
                                        <RadioButton 
                                        onPress={() => setSelectedRadio('Recusado')}
                                        selected={selectedRadio === 'Recusado'}/>
                                        <Status status="Recusado"/>    
                                    </View>
                                </View>
                            </View>
                        </BudgetCards>

                        {/* Lista de serviços */}

                        <BudgetCards title="Serviços inclusos" icon={"receipt-long"}> 

                            
                            <FlatList
                            style={{paddingHorizontal: 20, backgroundColor: '#A1A2A1', marginHorizontal: 20}}
                            data={services}
                            keyExtractor={(item) => item.id}
                            renderItem={({item}) => (
                                <>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10}}>
                                        <View style={{flexDirection: 'column', gap: 20}}>
                                            <Text>{item.title}</Text>
                                            <Text>{item.description}</Text>
                                        </View>
                                        <View style={{flexDirection: 'column', gap: 20}}>
                                            <Text>{item.price}</Text>
                                            <Text>{item.qty}</Text>
                                        </View>
                                    
                                    </View>
                                    <View style={styles.divider}/>
                                </>
                            )}
                            />
                            <View style={{paddingHorizontal: 20}}>
                                <Button title="+ Adicionar serviço" onPress={() => setAddService(true)}/>
                            </View>
                            
                            
                        </BudgetCards>

                        <BudgetCards title="Investimento" icon={"attach-money"} total>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{paddingBottom: 10, paddingHorizontal: 10, gap: 15}}>
                                    <View style={{
                                            flexDirection: 'row', 
                                            justifyContent: 'space-between', 
                                            paddingHorizontal: 15
                                        }}>
                                        <Text>Subtotal</Text> 
                                        
                                        <View style={{flexDirection: 'row', gap: 20}}>
                                            <Text style={{color: 'gray'}}>{totalServices} itens</Text>
                                            <Text>R$ {(subtotal.toFixed(2)).replace('.',',')}</Text>
                                        </View>
                                        
                                    </View>
                                    
                                    <View style={{
                                            flexDirection: 'row', 
                                            justifyContent: 'space-between', 
                                            paddingHorizontal: 15,
                                            alignItems: 'center'
                                        }}>
                                        <View style={{flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center'}}>
                                            <Text>Desconto</Text>

                                            <View style={{width: 60, height: 40, alignItems: 'center', justifyContent: 'center'}}>
                                                <Input 
                                                    variant={InputTypes.percentage}
                                                    keyboardType="numeric"
                                                    onChangeText={value => setDiscount(Number(value) || 0)}
                                                    value={String(discount)}
                                                />
                                            </View>
                                        </View>

                                        <Text style={{color: 'red'}}>
                                            {`- R$ ${((subtotal*(discount/100)).toFixed(2)).replace('.',',')}`}
                                        </Text>
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
                                        <Text style={{marginLeft: 10, textDecorationLine: "line-through"}}>
                                            {`R$ ${(subtotal.toFixed(2)).replace('.',',')}`}
                                        </Text>

                                        <Text style={{fontWeight: 700}}>
                                            {`R$ ${((subtotal-subtotal*(discount/100)).toFixed(2)).replace('.',',')}`}
                                        </Text>
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

            {addService && (
                <>
                    <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.4)'
                    }}>
                        <KeyboardAvoidingView
                        behavior={'height'}
                        style={{ flex: 1 }}
                        keyboardVerticalOffset={80}
                        >
                            <SafeAreaView style={{
                                position: 'absolute',
                                bottom: -80,
                                left: 0,
                                right: 0,
                                backgroundColor: 'white',
                                borderTopEndRadius: 8,
                                borderTopLeftRadius: 8,
                                paddingBottom: 40
                            }}>
                                <BudgetCards title="Serviços">
                                    <Input
                                    variant={InputTypes.text} 
                                    placeholder='Título'
                                    placeholderTextColor="gray"
                                    onChangeText={setServiceTitle}
                                />
                                    <Input
                                    variant={InputTypes.text} 
                                    placeholder='Descrição'
                                    placeholderTextColor="gray"
                                    onChangeText={setServiceDescription}
                                />
                                    <View style={{
                                        flexDirection: 'row',
                                        gap: 20
                                    }}>
                                        <Input
                                            variant={InputTypes.money}
                                            containerStyle={{flex: 1}}
                                            onChangeText={value => {
                                                const virgulaPonto = value.replace(',','.')

                                                const formattedServicePrice = virgulaPonto.replace(/[^0-9.]/g, '')

                                                const parsedValue = Number(formattedServicePrice)

                                                setServicePrice(parsedValue || 0)
                                            }}
                                        />
                                            <View 
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderWidth: 1,
                                                borderRadius: 25,
                                                paddingHorizontal: 12,
                                                backgroundColor: '#FAFAFA',
                                            }}>
                                                <View style={{
                                                justifyContent: "center",
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                                }}
                                            >
                                                <TouchableOpacity
                                                onPress={() => {if(ServiceQty > 1) setServiceQty(ServiceQty-1)}}
                                                >
                                                    <MaterialIcons name="remove" size={25} color={'purple'}/>
                                                </TouchableOpacity>
                                                
                                                <TextInput 
                                                value={String(ServiceQty)}
                                                editable={false}
                                                selectTextOnFocus={false}
                                                style={{
                                                    minWidth: 30,
                                                    textAlign: "center",
                                                        paddingVertical: 12,
                                                        paddingHorizontal: 8
                                                }}
                                                />

                                                <TouchableOpacity
                                                onPress={() => setServiceQty(ServiceQty+1)}>
                                                    <MaterialIcons name="add" size={25} color={'purple'}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>  
                                    </View>       

                                </BudgetCards>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 10,
                                    paddingTop: 15,
                                    paddingBottom: insets.bottom
                                }}>
                                    <Button title="Lixo" onPress={() => setAddService(false)}/>
                                    <Button title="Salvar" onPress={() => {
                                        const newService: ItemTypes = {
                                            id: String(Date.now()),
                                            title: serviceTitle,
                                            description: serviceDescription,
                                            price: servicePrice,
                                            qty: ServiceQty
                                        }
                                        setServices([...services, newService])

                                        setAddService(false)

                                        setServiceTitle('')
                                        setServiceDescription('')
                                        setServicePrice(0)
                                        setServiceQty(1)

                                        Keyboard.dismiss()

                                        console.log(services)
                                    }}/>
                                </View>
                            </SafeAreaView>
                        </KeyboardAvoidingView>
                    </View>
                </>
            )}
        </>
    )
}