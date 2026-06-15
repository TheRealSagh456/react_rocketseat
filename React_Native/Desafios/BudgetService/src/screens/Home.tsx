import Header from '@/components/headerHome';
import { FlatList, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import Quote from '@/components/Quote';
import { StatusTypes } from '@/types';
import { Input, InputTypes } from '@/components/Input';

export default function Home() {
  const quotes = Array.from({length: 30}, (_,index) => ({
      id: index.toString(),
      title:'Fábrica de Toddynho', 
      client:'Samuel Campos', 
      price:22222, 
      status:StatusTypes.Aprovado, 
      items: []
    }))

  return (
    <>
      <Header/>
      
      <View style={styles.divider}/>

      <View style={styles.container}>

      <View>

        <View>
          <Input variant={InputTypes.text} icon='search'/>
        </View>
        
      </View>

        <FlatList
          contentContainerStyle={styles.quoteList}
          data={quotes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Quote quote={item}/>
          )}
        />
    </View>

    </>
      )
}

