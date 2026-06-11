import { ButtonIcon } from "@/components/ButtonIcon";
import { Header } from "@/components/Header";
import { TItle } from "@/components/Title";
import { DrawerRoutesProps } from "@/routes/DrawerRoutes";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { View } from "react-native";


export function Home({navigation}: DrawerRoutesProps<"home">) {

    return (
        <View style={{flex: 1, padding: 32, paddingTop: 64}}>
            <Header>
                <ButtonIcon name="menu" onPress={() => {navigation.toggleDrawer()}}/>
                <TItle>
                    Home
                </TItle>
                <ButtonIcon name="add-circle" onPress={() => navigation.navigate("product", {id: "7"}) }/>
            </Header>
        </View>
    )
}