import {createBottomTabNavigator, BottomTabScreenProps} from "@react-navigation/bottom-tabs"
import {Product} from "@/screens/Product"
import {Home} from "@/screens/Home"
import { MaterialIcons } from "@expo/vector-icons"

export type TabRouteList = {
    home: undefined,
    product: undefined | {id: string}
}

export type TabRoutesProps<T extends keyof TabRouteList> = BottomTabScreenProps<TabRouteList, T>

const Tab = createBottomTabNavigator<TabRouteList>()

export function TabRoutes() {
    return (
        <Tab.Navigator 
        initialRouteName="home" 
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#2C4CB1",
            tabBarInactiveTintColor: "#444444",
            tabBarLabelPosition: "beside-icon"
        }}
        >
            <Tab.Screen 
            name="home" 
            component={Home}
            options={{
                tabBarLabel: "Início",
                tabBarIcon: ({color, size}) => <MaterialIcons name="home" size={size} color={color}/>
            }}
            />
            <Tab.Screen 
            name="product" 
            component={Product}
            options={{
                tabBarLabel: "Produto",
                tabBarIcon: ({color, size}) => <MaterialIcons name="add-circle" size={size} color={color}/>
            }}
            />
        </Tab.Navigator>
    )
}