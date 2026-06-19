import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { useTargetDatabase } from "@/database/useTargetDatabase";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [targetForm, setTargetForm] = useState({
        name: "",
        amount: 0
    })
    const params = useLocalSearchParams<{id?: string}>()
    const targetDatabase = useTargetDatabase()

    function handleSave() {
        if(!targetForm.name.trim() || targetForm.amount <= 0) {
            return Alert.alert("Atenção", "Preencha nome, e o valor precisa ser maior que zero.")
        }
        setIsProcessing(true)

        if(params.id) {
            // update
        } else {
            create()
        }
    }

    async function create() {
        try {
            await targetDatabase.create(targetForm)

            Alert.alert("Nova Meta", "Meta criada com sucesso!", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                }
            ])
        } catch(err) {
            Alert.alert("Erro", "Não foi possível criar a meta.")
            console.error("NEW_TARGET_ERROR", err)
            setIsProcessing(false)
        }
    }

    return (
        <View style={{
            flex: 1,
            padding: 24
        }}>
            <PageHeader 
                title="Meta" 
                subttitle="Economize para alcançar sua meta financeira."
            />
            <View style={{marginTop: 32, gap: 24}}>
                <Input 
                    label="Nome da Meta" 
                    placeholder="Ex: Viagem para praia, Apple Watch"
                    onChangeText={e => setTargetForm(prev => ({...prev, name: e}))}
                />
                <CurrencyInput 
                    label="Valor alvo (R$)" 
                    value={targetForm.amount || 0}
                    onChangeValue={e => setTargetForm(prev => ({...prev, amount: e}))}
                />
                <Button title="Salvar" onPress={handleSave} isProcessing={isProcessing}/>
            </View>
        </View>
    )
}