import {createDrawerNavigator, DrawerScreenProps} from "@react-navigation/drawer"
import {Product} from "@/screens/Product"
import {Home} from "@/screens/Home"
import { MaterialIcons } from "@expo/vector-icons"

export type DrawerRoutesList = {
    home: undefined,
    product: undefined | {id: string}
}

export type DrawerRoutesProps<T extends keyof DrawerRoutesList> = DrawerScreenProps<DrawerRoutesList, T>

const Drawer = createDrawerNavigator<DrawerRoutesList>()

export function DrawerRoutes() {
    return (
        <Drawer.Navigator 
        initialRouteName="home" 
        >
            <Drawer.Screen 
            name="home" 
            component={Home}
            options={{
                headerShown: false,
                drawerActiveTintColor: "#2C4CB1",
                drawerInactiveTintColor: "#444444",
                drawerIcon: ({color, size}) => <MaterialIcons name="home" size={size} color={color}/>
            }}
            />
            <Drawer.Screen 
            name="product" 
            component={Product}
            options={{
                headerShown: false,
                drawerActiveTintColor: "#2C4CB1",
                drawerInactiveTintColor: "#444444",
                drawerIcon: ({color, size}) => <MaterialIcons name="add-circle" size={size} color={color}/>
            }}
            />
        </Drawer.Navigator>
    )
}