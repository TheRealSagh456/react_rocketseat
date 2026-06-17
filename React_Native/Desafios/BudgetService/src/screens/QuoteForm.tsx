import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import BudgetCards from "@/components/BudgetCards";
import { MaterialIcons } from "@expo/vector-icons";
import Status from "@/components/status";
import { RadioButton } from "@/components/selectionButton";
import React, { useRef } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Input, InputTypes } from "@/components/Input";
import { TouchableOpacity } from "react-native";
import { ItemTypes, QuoteDocTypes, RootStackParamList, StatusTypes } from "@/types";
import { getQuoteById, newQuote, updateQuote } from "@/storage";
import { Button } from "@/components/Button";
import QuoteHeader from "@/components/headerQuotes";

export default function QuoteForm() {
    const navigation = useNavigation()

    const [quoteForm, setQuoteForm] = React.useState<QuoteDocTypes>({
        id: '',
        title: '',
        client: '',
        status: StatusTypes.Rascunho,
        items: [],
        discountPct: 0,
        createdAt: '',
        updatedAt: ''
    })
    const [selectedStatus, setSelectedStatus] = React.useState('')
    const [services, setServices] = React.useState<ItemTypes[]>([])

    const [addService, setAddService] = React.useState(false)

    const [serviceForm, setServiceForm] = React.useState<ItemTypes>({
        id: '',
        title: '',
        description: '',
        price: 0,
        qty: 1
    })

    const [discount, setDiscount] = React.useState(0)
    const [idsUsados, setIdsUsados] = React.useState(new Set());
    const [keyboardHeight, setKeyboardHeight] = React.useState(0)

    const insets = useSafeAreaInsets()

    const subtotal = React.useMemo(() => {
        return services.reduce((tt, item) => tt + (item.price*item.qty), 0)
    }, [services])

    const totalServices = React.useMemo(() => {
        return services.length
    }, [services])

    function resetServiceForm() {
        setServiceForm({
            id: '',
            title: '',
            description: '',
            price: 0,
            qty: 1,
        })
        Keyboard.dismiss()
    }

    function resetQuoteForm() {
        setQuoteForm({
        id: '',
        title: '',
        client: '',
        status: StatusTypes.Rascunho,
        items: [],
        discountPct: 0,
        createdAt: '',
        updatedAt: ''
        })
    }

    function handleEditService(item: ItemTypes) {
        setAddService(true)

        setServiceForm({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            qty: item.qty
        })
    }

    
    function useGeradorIdNumerico() {
    
      const obterNovoIdAleatorio = () => {
    
        let numeroAleatorio;
        let idString;
    
        do {
          numeroAleatorio = Math.floor(Math.random() * 67000) + 1;
          idString = numeroAleatorio.toString();
        } while (idsUsados.has(idString));
    
        idsUsados.add(idString);
        setIdsUsados(new Set(idsUsados));
    
        return idString;
      };
    
      return { obterNovoIdAleatorio };
    }

    const { obterNovoIdAleatorio } = useGeradorIdNumerico()

    React.useEffect(() => {
        console.log("SERVICES ATUALIZADOS", services)
    }, [services])

    type QuoteRouteProp = RouteProp<RootStackParamList, "Orçamento">

    const route = useRoute<QuoteRouteProp>()

    const editingQuoteId = route.params?.id

    React.useEffect(() => {
    async function loadQuoteToEdit() {
        if (!editingQuoteId) {
            return
        }

        const foundQuote = await getQuoteById(editingQuoteId)

        if (!foundQuote) return

        setQuoteForm(foundQuote)
        setServices(foundQuote.items)
        setSelectedStatus(foundQuote.status)
    }

    loadQuoteToEdit()
}, [editingQuoteId])


    React.useEffect(() => {
        const show = Keyboard.addListener('keyboardDidShow', (e) => {
            setKeyboardHeight(e.endCoordinates.height)
        })
        const hide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardHeight(0)
        })
        return () => { show.remove(); hide.remove() }
    }, [])

    return (
        <>
            <QuoteHeader/>
            <View style={styles.divider}/>
            <ScrollView>
            
                <View style={styles.container}>  
                        
                        {/* Infos gerais */}
                        <BudgetCards title="Informações gerais" icon={"store"}>
                            <View style={{paddingHorizontal: 20}}>
                                <Input
                                variant={InputTypes.text} 
                                placeholder='Título'
                                value={quoteForm.title}
                                placeholderTextColor="gray"
                                onChangeText={e => setQuoteForm(prev => ({...prev, title: e}))}
                            />
                            </View>
                            <View style={{paddingHorizontal: 20}}>
                                <Input
                                variant={InputTypes.text} 
                                placeholder='Cliente'
                                value={quoteForm.client}
                                placeholderTextColor="gray"
                                onChangeText={e => setQuoteForm(prev => ({...prev, client: e}))}
                            />
                            </View>
                        </BudgetCards>
                        
                        {/* Status */}
                        <BudgetCards title="Status" icon={"sell"}>

                            <View style={{flexDirection: 'row'}}>
                            
                                <View style={{justifyContent: 'center', marginHorizontal: 30, flexDirection:"column", gap:20}}>
                                    <TouchableOpacity 
                                    style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }} 
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedStatus('Rascunho')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Rascunho
                                        }))
                                    }}>
                                        <RadioButton 
                                        selected={selectedStatus === 'Rascunho'}
                                        onPress={() => {
                                        setSelectedStatus('Rascunho')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Rascunho
                                        }))
                                    }}
                                        />
                                        <Status status="Rascunho"/>
                                    </TouchableOpacity>
                                    <TouchableOpacity 
                                    style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedStatus('Aprovado')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Aprovado
                                        }))
                                    }}>
                                        <RadioButton
                                        selected={selectedStatus === 'Aprovado'}
                                        onPress={() => {
                                        setSelectedStatus('Aprovado')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Aprovado
                                        }))
                                    }}
                                        />
                                        <Status status="Aprovado"/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    justifyContent: 'center', 
                                    marginRight: 30, 
                                    flexDirection:"column", 
                                    gap:20
                                }}>
                                    <TouchableOpacity 
                                    style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedStatus('Enviado')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Enviado
                                        }))
                                    }}>
                                        <RadioButton 
                                        selected={selectedStatus === 'Enviado'}
                                        onPress={() => {
                                        setSelectedStatus('Enviado')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Enviado
                                        }))
                                    }}
                                        />
                                        <Status status="Enviado"/>    
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                    style={{
                                        flexDirection: 'row',
                                        gap: 7
                                    }}
                                    activeOpacity={0.8}
                                    onPress={() => {
                                        setSelectedStatus('Recusado')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Recusado
                                        }))
                                    }}
                                    >
                                        <RadioButton 
                                        selected={selectedStatus === 'Recusado'}
                                        onPress={() => {
                                        setSelectedStatus('Recusado')
                                        setQuoteForm(prev => ({
                                            ...prev,
                                            status: StatusTypes.Recusado
                                        }))
                                    }}/>
                                        <Status status="Recusado"/>    
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </BudgetCards>

                        {/* Lista de serviços */}

                        <BudgetCards title="Serviços inclusos" icon={"receipt-long"}> 

                            <View>
                                {services.map((item) => (
                                    <View key={item.id} style={{
                                        flexDirection: 'row', 
                                        alignItems: 'center',
                                        paddingHorizontal: 20,
                                        paddingVertical: 12,
                                        }}>
                                        <View style={{flex: 1, paddingRight: 10}}>
                                            <Text 
                                            style={{fontSize: 16, fontWeight: 600}} 
                                            numberOfLines={1}>{item.title}</Text>
                                            <Text 
                                            style={{color: '#8E8E93', fontSize: 13}} 
                                            numberOfLines={1}>{item.description}</Text>
                                        </View>
                                        <View style={{alignItems: "flex-end", width: "auto"}}>
                                                <Text style={{fontSize: 14}}>R$ {''}
                                                    <Text style={{fontSize: 18, fontWeight: 700}}>
                                                    {(item.price).toLocaleString('pt-BR', {
                                                        maximumFractionDigits: 2,
                                                        minimumFractionDigits: 2
                                                    })}
                                                    </Text>
                                                </Text>

                                                <Text style={{color: '#8E8E93', fontSize: 12}}>
                                                    Qt: {item.qty}
                                                </Text>

                                            
                                        </View>
                                        <TouchableOpacity 
                                        style={{width: 26, alignItems:'flex-end'}}
                                        onPress={() => handleEditService(item)}>
                                            <MaterialIcons name="edit" size={20} color={'#6A46EB'}/>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                            
                            <View style={{paddingHorizontal: 20}}>
                                <Button variant="gray" onPress={() => setAddService(true)}>
                                    <MaterialIcons name="add" size={25} color={'purple'}/>
                                    <Text style={{fontSize: 16, color: 'purple'}}>Adicionar serviço</Text>    
                                </Button>
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
                                                    selectTextOnFocus
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
                                        {
                                        subtotal > subtotal-subtotal*(discount/100) && <Text 
                                            style={{marginLeft: 10, textDecorationLine: "line-through"}}
                                        >
                                            {`R$ ${(subtotal.toLocaleString(
                                                "pt-BR", {
                                                    maximumFractionDigits: 2,
                                                    minimumFractionDigits: 2
                                                }))}`}
                                        </Text>
                                        }
                                        <Text style={{fontWeight: 700}}>
                                            {`R$ ${((subtotal-subtotal*(discount/100)).toLocaleString(
                                                "pt-BR", {
                                                    maximumFractionDigits: 2,
                                                    minimumFractionDigits: 2
                                                }))}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </BudgetCards>
                        
                    
                    <View style={{flexDirection: "row", gap: 15, justifyContent: 'center'}}>
                        <Button variant="gray" onPress={() => navigation.goBack()}>
                            <Text style={{fontSize: 16, color: 'purple', padding: 4}}>Cancelar</Text>
                        </Button>
                        <Button variant="purple" onPress={async () => {
                            

                            const Quote: QuoteDocTypes = {
                                id: editingQuoteId || obterNovoIdAleatorio(),
                                title: quoteForm.title,
                                client: quoteForm.client,
                                status: quoteForm.status,
                                items: services,
                                discountPct: discount,
                                createdAt: quoteForm.createdAt || new Date().toString(),
                                updatedAt: new Date().toString()
                            }
                            
                            if(editingQuoteId) {
                                await updateQuote(Quote)
                                console.log(Quote.createdAt)
                            } else {
                                await newQuote(Quote)
                            }

                            resetQuoteForm()

                            navigation.navigate("home")
                        }}>
                            <View style={{padding: 4, flexDirection: 'row', borderRadius: 10, gap: 8, alignItems: 'center'}}>
                                <MaterialIcons name="check" size={20} color={'white'}/>
                                <Text style={{fontSize: 16, color: 'white', fontWeight: 500}}>Salvar</Text>    
                            </View>
                        </Button>
                    </View>
                </View>
            </ScrollView>

        {addService && (
            <View style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: keyboardHeight,
                backgroundColor: 'rgba(0,0,0,0.4)',
                justifyContent: 'flex-end'
            }}>
                    <View style={{
                        backgroundColor: 'white',
                        borderTopEndRadius: 8,
                        borderTopLeftRadius: 8,
                        height: "auto",
                        paddingBottom: insets.bottom || 20,
                    }}>
                        <View style={{ paddingHorizontal: 20, paddingVertical: 16 }}>
                            <Text style={{ fontWeight: '700' }}>Serviço</Text>
                        </View>
                        <View style={styles.divider}/>

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            <View style={{ paddingHorizontal: 20, paddingTop: 16, flexDirection: 'column', gap: 13 }}>
                                <Input
                                    variant={InputTypes.text}
                                    placeholder='Título'
                                    placeholderTextColor="gray"
                                    onChangeText={(title) => setServiceForm(prev => ({ ...prev, title }))}
                                    value={serviceForm.title || ""}
                                />
                                <Input
                                    variant={InputTypes.text}
                                    placeholder='Descrição'
                                    placeholderTextColor="gray"
                                    onChangeText={(description) => setServiceForm(prev => ({ ...prev, description }))}
                                    value={serviceForm.description || ''}
                                    multiline
                                    numberOfLines={5}
                                    containerStyle={{ minHeight: 140, paddingTop: 12 }}
                                />
                                <View style={{ flexDirection: 'row', gap: 20 }}>
                                    <Input
                                        variant={InputTypes.money}
                                        value={String(serviceForm.price)}
                                        containerStyle={{ flex: 1 }}
                                        onChangeText={value => {
                                            const virgulaPonto = value.replace(',', '.')
                                            const formattedServicePrice = virgulaPonto.replace(/[^0-9.]/g, '')
                                            const parsedValue = Number(formattedServicePrice)
                                            setServiceForm(prev => ({ ...prev, price: parsedValue || 0 }))
                                        }}
                                    />
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        borderWidth: 1,
                                        borderRadius: 25,
                                        paddingHorizontal: 12,
                                        backgroundColor: '#FAFAFA',
                                    }}>
                                        <View style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    if (serviceForm.qty > 1)
                                                        setServiceForm(prev => ({ ...prev, qty: serviceForm.qty - 1 }))
                                                }}
                                            >
                                                <MaterialIcons name="remove" size={25} color={'#6A46EB'}/>
                                            </TouchableOpacity>
                                            <TextInput
                                                value={String(serviceForm.qty)}
                                                editable={false}
                                                selectTextOnFocus={false}
                                                style={{
                                                    minWidth: 30,
                                                    textAlign: 'center',
                                                    paddingVertical: 12,
                                                    paddingHorizontal: 8
                                                }}
                                            />
                                            <TouchableOpacity
                                                onPress={() => setServiceForm(prev => ({ ...prev, qty: serviceForm.qty + 1 }))}
                                            >
                                                <MaterialIcons name="add" size={25} color={'#6A46EB'}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={{ paddingVertical: 20 }}>
                                <View style={styles.divider}/>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 10,
                                paddingBottom: 20,
                            }}>
                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        borderRadius: 30,
                                        borderColor: '#F0F0F0',
                                        borderWidth: 2,
                                        backgroundColor: '#FAFAFA',
                                    }}
                                    onPress={() => {
                                        setServices(prev => prev.filter(service => service.id !== serviceForm.id))
                                        setServiceForm(prev => ({ ...prev, id: '' }))
                                        setQuoteForm(prev => ({ ...prev, id: '' }))
                                        setAddService(false)
                                        resetServiceForm()
                                    }}
                                >
                                    <MaterialIcons name="delete" size={24} color={'red'}/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        borderRadius: 20,
                                        backgroundColor: '#6A46EB',
                                    }}
                                    onPress={() => {
                                        if (
                                            !serviceForm.title.trim() ||
                                            !serviceForm.description.trim() ||
                                            serviceForm.price <= 0 ||
                                            serviceForm.qty <= 0
                                        ) {
                                            return Alert.alert("Campos obrigatórios", "Preencha-os corretamente.")
                                        }

                                        if (serviceForm.id) {
                                            setServices(prev =>
                                                prev.map(service => service.id === serviceForm.id ? {
                                                    ...service,
                                                    title: serviceForm.title,
                                                    description: serviceForm.description,
                                                    price: serviceForm.price,
                                                    qty: serviceForm.qty
                                                } : service)
                                            )
                                        } else {
                                            const newService: ItemTypes = {
                                                id: String(Date.now()),
                                                title: serviceForm.title,
                                                description: serviceForm.description,
                                                price: serviceForm.price,
                                                qty: serviceForm.qty
                                            }
                                            setServices(prev => [...prev, newService])
                                        }

                                        setAddService(false)
                                        resetServiceForm()
                                        Keyboard.dismiss()
                                    }}
                                >
                                    <MaterialIcons name="check" size={24} color={'white'}/>
                                    <Text style={{ color: 'white' }}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
            </View>
        )}
        </>
    )
}