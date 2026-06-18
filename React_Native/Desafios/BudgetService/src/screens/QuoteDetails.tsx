import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import ViewShot from "react-native-view-shot"
import * as Sharing from 'expo-sharing'
import { captureRef } from 'react-native-view-shot'
import { Alert, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import BudgetCards from "@/components/BudgetCards";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { QuoteDocTypes, RootStackParamList, StatusTypes } from "@/types";
import QuoteHeader from "@/components/headerQuotes";
import { deleteQuote, duplicateQuote, getQuoteById, getQuotes } from "@/storage";
import { Button } from "@/components/Button";

export default function QuoteForm() {
    const navigation = useNavigation()
    
    const [quote, setQuote] = React.useState<QuoteDocTypes | null>({
        id: '',
        title: '',
        client: '',
        status: StatusTypes.Rascunho,
        items: [],
        discountPct: 0,
        createdAt: '',
        updatedAt: ''
    })

    type DetailsRouteProp = RouteProp<RootStackParamList, "details">

    const route = useRoute<DetailsRouteProp>()

    const quoteId = route.params?.id

    React.useEffect(() => {
        async function loadQuote() {
        const quotes = await getQuotes();

        const foundQuote = quotes.find(
        q => q.id === quoteId
        );

        if(!foundQuote) {
            setQuote(null)
            Alert.alert("Não encontrado", "O orçamento selecionado não foi encontrado")
            navigation.goBack()
            return
        }

        const formatDate = (dateString: string | undefined): string => {
            if (!dateString) return '';
            const dateObject = new Date(dateString);
            
            return new Intl.DateTimeFormat("pt-BR", {
                day: '2-digit',
                month: '2-digit',
                year: "numeric"
            }).format(dateObject);
        };

        setQuote({
            id: foundQuote?.id,
            title: foundQuote?.title,
            client: foundQuote?.client,
            status: foundQuote.status,
            items: foundQuote?.items,
            discountPct: foundQuote.discountPct, 
            createdAt: formatDate(foundQuote.createdAt),
            updatedAt: formatDate(foundQuote.updatedAt),
        })}

        loadQuote();
    }, [quoteId])

    const subtotal = React.useMemo(() => {
        return quote?.items.reduce((tt, item) => tt + (item.price*item.qty), 0) ?? 0
    }, [quote])

    const viewShotRef = React.useRef<any>(null)

    async function handleShareAsImage() {
        try {
            if (!viewShotRef.current) {
                Alert.alert("Erro", "Área não pronta para captura.")
                return
            }

            const uri = await viewShotRef.current.capture?.({
                format: "png",
                quality: 0.9
            })

            if (!uri) throw new Error("Nenhuma imagem capturada")

            const shareUri = /^(file:|content:|data:)/.test(uri) ? uri : `file://${uri}`
            const message = `Orçamento: ${quote?.title ?? ''}`.trim() || "Orçamento em anexo"

            await Sharing.shareAsync(shareUri, {dialogTitle: message, mimeType: 'image/png'})
        } catch (err) {
            console.error(err)
            Alert.alert("Erro", "Não foi possível compartilhar a imagem.")
        }
    }

    return (
        <>
            <QuoteHeader id={route.params?.id} quote={quote!}/>
            <View style={styles.divider}/>
            <ScrollView style={{backgroundColor: 'white'}}>
                <ViewShot ref={viewShotRef} options={{ format: "png", quality: 0.9 }}>
                    <View style={styles.container}>
                            <View style={{
                                borderColor: "#E6E5E5", 
                                borderRadius: 10, 
                                borderWidth: 1,
                                backgroundColor: '#FAFAFA',
                                paddingVertical: 15
                                }}>
                                    <View style={{
                                            flexDirection: 'row', 
                                            alignItems: 'center', 
                                            gap: 8,
                                            paddingHorizontal: 20
                                        }}>
                                        <View style={{
                                            backgroundColor: '#DFDAF2',
                                            borderRadius: 10,
                                            padding: 3
                                        }}>
                                            <MaterialIcons name="store" size={22} color={'#6A46EB'} style={{padding: 5}}/>
                                        </View>

                                        <Text style={{
                                            fontSize: 18, 
                                            fontWeight: 600, 
                                            flexShrink: 1,
                                            flex: 1,
                                            minWidth: 0}}>
                                            {quote?.title}
                                        </Text>
                                    </View>
                                    <View style={{paddingVertical: 10}}>
                                        <View style={styles.divider}/>
                                    </View>
                                <View style={{flexDirection: "column", paddingHorizontal: 22, gap: 8}}>
                                    <View style={{gap: 2}}>
                                        <Text>Cliente</Text>
                                        <Text style={{fontSize: 16, fontWeight: 500}}>{quote?.client}</Text>
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: "flex-start", gap: 50}}>
                                        <View>
                                            <Text>Criado em</Text>
                                            <Text style={{fontSize: 16, fontWeight: 500}}>{quote?.createdAt}</Text>
                                        </View>
                                        <View>
                                            <Text>Atualizado em</Text>
                                            <Text style={{fontSize: 16, fontWeight: 500}}>{quote?.updatedAt}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Lista de serviços */}

                            <BudgetCards title="Serviços inclusos" icon={"receipt-long"}> 

                                <View>
                                    {quote?.items.map((item) => (
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
                                                numberOfLines={2}>{item.description}</Text>
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
                                        </View>
                                    ))}
                                </View>
                            </BudgetCards>
                            <View style={{
                                borderColor: "#E6E5E5", 
                                borderRadius: 10, 
                                borderWidth: 1,
                                backgroundColor: '#FAFAFA',
                                paddingVertical: 15
                                }}>
                                    <View style={{
                                            flexDirection: 'row', 
                                            alignItems: 'center', 
                                            gap: 8,
                                            paddingHorizontal: 20
                                        }}>
                                        <View style={{
                                            backgroundColor: '#DFDAF2',
                                            borderRadius: 10,
                                            padding: 3
                                        }}>
                                            <MaterialIcons name="attach-money" size={22} color={'#6A46EB'} style={{padding: 5}}/>
                                        </View>

                                        <View style={{flexDirection: 'column', flex: 1, gap: 5}}>
                                            <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                                                <Text style={{}}>
                                                    Subtotal
                                                </Text>
                                                <Text style={{}}>
                                                    R$ {subtotal.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </Text>
                                            </View>
                                            <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
                                                <View style={{flexDirection: 'row', gap: 8}}>
                                                    <Text style={{}}>
                                                        Desconto
                                                    </Text>
                                                    <View style={{
                                                        backgroundColor: '#BFF7BE', 
                                                        alignItems: 'center', 
                                                        paddingHorizontal: 3, 
                                                        paddingVertical: 2,
                                                        borderRadius: 8
                                                    }}>
                                                        <Text style={{color: '#30752F',fontSize: 12, padding: 1}}>{quote?.discountPct}% off</Text>
                                                    </View>
                                                </View>
                                                <Text style={{color: '#30752F', fontWeight: 500}}>
                                                    - R$ {
                                                    (subtotal*(quote?.discountPct ?? 0)/100)
                                                    .toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{paddingVertical: 10}}>
                                        <View style={styles.divider}/>
                                    </View>
                                <View style={{flexDirection: "row", paddingHorizontal: 22, alignItems: 'center', justifyContent: "space-between", marginLeft: 10}}>
                                    <Text style={{fontWeight: 600, fontSize: 15}}>Investimento Total</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'flex-end', gap: 5}}>
                                        <Text>R$</Text>
                                        <Text style={{fontWeight: 700, fontSize: 18}}>
                                            {
                                            (subtotal-subtotal*(quote?.discountPct ?? 0)/100)
                                            .toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})
                                            }
                                        </Text>
                                    </View>
                                </View>
                            </View> 
                        </View>
                        <View style={{width: 'auto', marginTop: -40, paddingVertical: 8}}>
                            <View style={styles.divider}/>
                        </View>
                        <View style={styles.container}>

                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row', gap: 10}}>
                                    <View>
                                        <Button 
                                        variant="gray"
                                        onPress={() => Alert.alert("Excluir Orçamento", "Tem certeza que deseja excluir esse orçamento?",
                                            [
                                                {
                                                    text: "Cancelar",
                                                    style: 'cancel'
                                                },
                                                {   
                                                    text: "Excluir",
                                                    style: "destructive",
                                                    onPress: async () => {
                                                        await deleteQuote(quoteId!)
                                                        navigation.goBack()
                                                    }
                                                }
                                            ]
                                        )}
                                        >
                                            <MaterialIcons name="delete" color={'red'} size={25} style={{padding: 2}}/>
                                        </Button>
                                    </View>
                                    <View>
                                        <Button variant="gray" 
                                        onPress={() => Alert.alert("Duplicar Orçamento", "Deseja duplicar o orçamento?",
                                            [
                                                {
                                                    text: "Não",
                                                    style: 'cancel'
                                                },
                                                {   
                                                    text: "Sim",
                                                    style: "default",
                                                    onPress: async () => {
                                                        const original = await getQuoteById(quoteId!)
                                                        
                                                        if(!original) {
                                                            return
                                                        }

                                                        await duplicateQuote(original)
                                                        navigation.goBack()
                                                    }
                                                }
                                            ]
                                        )}
                                        >
                                            <MaterialIcons name="content-copy" color={'purple'} size={25} style={{padding: 2}}/>
                                        </Button>
                                    </View>
                                    <View>
                                        <Button variant="gray"
                                        onPress={() => {
                                                    navigation.navigate("Orçamento", {id: quoteId!})
                                            }}
                                        >
                                            <MaterialIcons name="mode-edit-outline" color={'purple'} size={25} style={{padding: 2}}/>
                                        </Button>
                                    </View>
                                </View>
                                <View>
                                    <Button variant="purple" onPress={handleShareAsImage}>
                                        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, padding: 2}}>
                                            <MaterialIcons name="share" color={'white'} size={25}/>
                                            <Text style={{color:'white', fontWeight: 500}}>Compartilhar</Text>
                                        </View>
                                    </Button>
                                </View>
                            </View>
                    </View>
                </ViewShot>
            </ScrollView>
        </>
    )
}