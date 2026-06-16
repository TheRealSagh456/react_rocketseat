import { QuoteDocTypes } from "@/types";
import { Text, View } from "react-native";
import { styles } from "./styles";
import Status from "./status";

type Props = {
    quote: QuoteDocTypes
}

export default function Quote({quote}: Props) {
    const formattedPrice = quote.items.reduce((tt, item) => tt + (item.price ?? 0), 0)

    return (
        <View style={styles.quoteContainer}>
            <View style={{
                flex: 1,
                minWidth: 0,
                flexShrink: 1,
                gap: 4
            }}>
                <Text style={{fontSize: 16, fontWeight: 600}} numberOfLines={2}>{quote.title}</Text>
                <Text style={{fontSize: 13}}>{quote.client}</Text>
            </View>
            <View style={{
                width: 'auto',
                alignItems: 'flex-end',
                marginLeft: 12,
            }}>
                    <Status status={quote.status}/>
                <View style={{flexDirection: 'row', marginTop: 8, gap: 5, alignItems: 'baseline'}}>
                    <Text style={{fontSize: 12}}>R$</Text>
                    <Text style={{fontSize: 17, fontWeight: 700}}>
                        {`${formattedPrice.toLocaleString("pt-BR", {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
                    </Text>
                </View>
            </View>
        </View>
    )
}