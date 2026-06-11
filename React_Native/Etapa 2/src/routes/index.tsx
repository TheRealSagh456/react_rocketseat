import { NavigationContainer } from "@react-navigation/native";
import { TabRoutes } from "./BottomRoutes";
import { DrawerRoutes } from "./DrawerRoutes";
import { StackRoutes } from "./StackRoutes";

export function Routes() {
    return (
        <NavigationContainer>
            <DrawerRoutes/>
        </NavigationContainer>
    )
}