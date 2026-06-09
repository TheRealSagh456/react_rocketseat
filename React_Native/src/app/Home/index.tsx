import { View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/filter';
import { FilterStatus } from '@/types/FilterStatus';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo}/>

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?'/>
        <Button 
        title='Comprar' 
        onPress={() => console.log("2 bilhões de pirakids a caminho de seu recinto")} 
        activeOpacity={0.8}/>
      </View>

      <View style={styles.content}>
        <Filter isActive={true} status={FilterStatus.DONE}/>
        <Filter isActive={false} status={FilterStatus.PENDING}/>
      </View>
      </View>
  );
}


