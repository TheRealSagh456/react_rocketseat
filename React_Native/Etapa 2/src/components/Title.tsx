import {Text, TextProps} from 'react-native'

export function TItle({children, ...props}: TextProps) {
    return (
        <Text style={{fontSize: 22, fontWeight: 700}} {...props}>
            {children}
        </Text>
    )
}