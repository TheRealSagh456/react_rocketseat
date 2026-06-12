import Header from '@/components/headerHome';
import { FlatList, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import Quote from '@/components/Quote';
import { StatusTypes } from '@/types';

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
          <TextInput 
            placeholder='Título ou cliente'
            placeholderTextColor="gray"
            style={{
              borderWidth: 1,
              height: 50,
              margin: 16,
              paddingHorizontal: 12, //do placeholder
              borderRadius: 25,
            }}
          />
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

