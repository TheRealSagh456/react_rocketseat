import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Filter } from '@/components/filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/components/Item';
import React, { useEffect } from 'react';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorage';

const FILTER_STATUS : FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE]

export default function Home() {

  const [filter, setFilter] = React.useState(FilterStatus.PENDING)
  const [description, setDescription] = React.useState('')
  const [items, setItems] = React.useState<ItemStorage[]>([])

  async function handleAdd() {
    if(!description.trim()) {
      return Alert.alert("Adicionar", "Informe a descrição para adicionar")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await getItemsByStatus()

    setFilter(FilterStatus.PENDING)
    Alert.alert("Adicionado",`Comprar ${description}`)
    setDescription("")
  }

  async function getItemsByStatus() {
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch(error) {
      console.error(error)
      Alert.alert("Erro", "Não foi possível filtrar os itens.")
    }
  }

  async function handleRemove(id:string) {
    try {
      await itemsStorage.remove(id)
    } catch(error) {
      console.error(error)
      Alert.alert("Remover", "Não foi possível remover.")
    }
  }

  async function onClear() {
    try {
      await itemsStorage.clear()
    } catch(error) {
      console.error(error)
      Alert.alert("Erro", "Não foi possível remover todos os items.")
    }
  }

  function handleClear() {
    Alert.alert("Limpar", "Deseja remover tudo?", [
      {text: "Não", style: "cancel"},
      {text: "Sim", onPress: () =>  onClear()}
  ])}

  async function handleToggleItemStatus(id: string) {
    try {
      await itemsStorage.toggleStatus(id)
    } catch(error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível atualizar o status.")
    }
  }

  useEffect(() => {
    getItemsByStatus()
  }, [filter, handleRemove, handleClear, handleToggleItemStatus])

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} style={styles.logo}/>

      <View style={styles.form}>
        <Input 
          placeholder='O que você precisa comprar?'
          onChangeText={setDescription}
          value={description}
        />
        <Button 
          title='Adicionar'
          onPress={handleAdd} 
          activeOpacity={0.8}
          />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          {
            FILTER_STATUS.map((status) => (
              <Filter 
              key={status} 
              isActive={status === filter} 
              status={status}
              onPress={() => setFilter(status)}/>
            ))
          }

          <TouchableOpacity style={styles.clearButton}> 
            <Text style={styles.clearText} onPress={handleClear}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={items} 
          keyExtractor={item => item.id} 
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui.</Text>}
          renderItem={({item}) => (
            <Item
                data={item} //Porque no componente <Item/> "data" foi definido nas Props
                onRemove={() => handleRemove(item.id)}
                onStatus={() => handleToggleItemStatus(item.id)}
              />
          )}
        />

      </View>
    </View>
  )
}


