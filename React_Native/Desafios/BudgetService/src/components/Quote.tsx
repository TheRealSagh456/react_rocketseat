import { QuoteDocTypes } from "@/types";
import { Text, View } from "react-native";
import { styles } from "./styles";

type Props = {
    quote: QuoteDocTypes
}

export default function Quote({quote}: Props) {
    const formattedPrice = quote.price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

    return (
        <View style={styles.quoteContainer}>
            <View style={{
                flexDirection: "column",
                gap: 20
            }}>
                <Text>{quote.title}</Text>
                <Text>{quote.client}</Text>
            </View>
            <View style={{
                flexDirection: "column",
                gap: 20
            }}>
                <Text>{quote.status}</Text>
                <Text>{`R$ ${formattedPrice}`}</Text>
            </View>
        </View>
    )
}