import Header from '@/components/headerHome';
import { FlatList, Text, View } from 'react-native';
import { styles } from './styles';
import Quote from '@/components/Quote';
import { QuoteDocTypes } from '@/types';
import { Input, InputTypes } from '@/components/Input';
import { getQuotes } from '@/storage';
import React from 'react';

export default function Home() {
  const [quotes, setQuotes] = React.useState<QuoteDocTypes[]>([])

  React.useEffect(() => {
    async function loadQuotes() {
      const data = await getQuotes()
      setQuotes(data)  
    }

    loadQuotes()
  }, [])

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

        {
          quotes.length < 1 
          ? <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50}}>
              <Text style={{justifyContent: 'center', alignItems: 'center', color: '#A1A2A1'}}>
                Os orçamentos adicionados serão exibidos aqui
              </Text>
            </View>
          :
        <FlatList
          contentContainerStyle={styles.quoteList}
          data={quotes}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Quote quote={item}/>
          )}
        />
        }
    </View>
          
    </>
      )
}

