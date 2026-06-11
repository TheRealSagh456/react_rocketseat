import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack"
import {Product} from "@/screens/Product"
import {Home} from "@/screens/Home"

export type StackRouteList = {
    home: undefined,
    product: undefined | {id: string}
}

export type StackRoutesProps<T extends keyof StackRouteList> = NativeStackScreenProps<StackRouteList, T>

const Stack = createNativeStackNavigator<StackRouteList>()

export function StackRoutes() {
    return (
        <Stack.Navigator initialRouteName="home" screenOptions={{headerShown: false}}>
            <Stack.Screen name="home" component={Home}/>
            <Stack.Screen name="product" component={Product}/>
        </Stack.Navigator>
    )
}