import { ButtonIcon } from "@/components/ButtonIcon";
import { Header } from "@/components/Header";
import { TItle } from "@/components/Title";
import { StackRoutesProps } from "@/routes/StackRoutes";
import { View } from "react-native";


export function Product({navigation, route}: StackRoutesProps<"product">) {
    
    return (
        <View style={{flex: 1, padding: 32, paddingTop: 54}}>
            <Header>
                <ButtonIcon name="arrow-circle-left" onPress={() => navigation.goBack()}/>

                <TItle>
                    Product {route.params?.id}
                </TItle>
            </Header>
        </View>
    )
}