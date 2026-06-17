import Header from '@/components/headerHome';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Quote from '@/components/Quote';
import { QuoteDocTypes } from '@/types';
import { Input, InputTypes } from '@/components/Input';
import { getQuotes } from '@/storage';
import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
import { MaterialIcons } from '@expo/vector-icons';

export default function Home() {
  const [quotes, setQuotes] = React.useState<QuoteDocTypes[]>([])

  const navigation = useNavigation()
  
  async function loadQuotes() {
      const data = await getQuotes()

      console.log(JSON.stringify(quotes, null, 2))

      setQuotes(data)  
    }

  useFocusEffect(
    React.useCallback(() => {
    loadQuotes()

    return () => {}
  }, []))

  return (
    <>
      <Header/>
      
      <View style={styles.divider}/>

      <View style={styles.container}>

      <View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 1}}>
          <View style={{flex: 1}}>
            <Input variant={InputTypes.text} icon='search'/> 
          </View>
            <Button variant='gray' style={{padding: 10}}>
                <MaterialIcons name='tune' color={"#6A46EB"} size={20} style={{padding: 2}}/>
            </Button>
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
            <TouchableOpacity activeOpacity={0.5} onPress={() => {
              navigation.navigate("details", {id: item.id})
              }}>
              <Quote quote={item}/>
            </TouchableOpacity>
          )}
        />
        }
    </View>
          
    </>
      )
}

