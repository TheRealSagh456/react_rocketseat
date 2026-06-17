import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/screens/Home";
import QuoteDetails from "@/screens/QuoteDetails";
import QuoteForm from "@/screens/QuoteForm";
import HeaderButtonToHome from "@/components/headerQuotes";
import { RootStackParamList } from "@/types";

const Stack = createNativeStackNavigator()

export default function Routes() {
    return (
        <Stack.Navigator initialRouteName="home">
            <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="Orçamento" component={QuoteForm} options={{headerShown: false}}/>
            <Stack.Screen name="details" component={QuoteDetails} options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}