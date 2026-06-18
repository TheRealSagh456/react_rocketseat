import Header from '@/components/headerHome';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Quote from '@/components/Quote';
import { FilterOptions, QuoteDocTypes, StatusTypes } from '@/types';
import { Input, InputTypes } from '@/components/Input';
import { filterQuotes, getQuotes } from '@/storage';
import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button } from '@/components/Button';
import { MaterialIcons } from '@expo/vector-icons';
import { RefreshControl } from 'react-native-gesture-handler';
import { RadioButton } from '@/components/selectionButton';
import Status from '@/components/status';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Home() {
  const [quotes, setQuotes] = React.useState<QuoteDocTypes[]>([])
  const [allQuotes, setAllQuotes] = React.useState<QuoteDocTypes[]>([])
  const [atualizando, setAtualizando] = React.useState(false)
  const [filtrando, setFiltrando] = React.useState(false)
  const [filter, setFilter] = React.useState<FilterOptions>({
    status: [],
    orderBy: undefined,
    order: undefined
  })

  const navigation = useNavigation()

  const insets = useSafeAreaInsets()

  const toggleStatus = (statusToggle: StatusTypes) => {
    setFilter(prev => {
      const current: StatusTypes[] = prev.status ?? []
      const selected = current.includes(statusToggle)

      const newStatus: StatusTypes[] = selected 
      ? current.filter(s => s !== statusToggle)
      : [...current, statusToggle]

      return {...prev, status: newStatus}
    })
  }
  
  
  async function loadQuotes() {
    try {
      const data = await getQuotes()
      setQuotes(data)
      setAllQuotes(data)
    } catch(err) {
      console.error("Erro ao carregar quotes", err)
    }
  }

  const aoAtualizar = React.useCallback(async () => {
    setAtualizando(true)
    await loadQuotes()
    setAtualizando(false)
  }, [])

  useFocusEffect(
    React.useCallback(() => {
    loadQuotes()

    return () => {}
  }, []))


  return (
    <View style={{flex: 1}}>
      <Header/>
      
      <View style={styles.divider}/>

      <View style={styles.container}>

      <View>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between", gap: 1}}>
          <View style={{flex: 1}}>
            <Input variant={InputTypes.text} icon='search'/> 
          </View>
            <Button variant='gray' style={{padding: 10}} onPress={() => setFiltrando(true)}>
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
          refreshControl={
            <RefreshControl 
              refreshing={atualizando} 
              onRefresh={aoAtualizar}  
              colors={['#6A46EB', '#DFDAF2']} 
              tintColor={"#DFDAF2"}
            />
          }
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
    {filtrando && (
                <View style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: insets.bottom || 20,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    justifyContent: 'flex-end'
                }}>
                        <View style={{
                            position: "absolute",
                            backgroundColor: 'white',
                            borderTopEndRadius: 8,
                            borderTopLeftRadius: 8,
                            height: "auto",
                            width: "100%"
                        }}>
                            <View style={{ paddingHorizontal: 20, paddingVertical: 16, justifyContent: "space-between", flexDirection: "row" }}>
                                <Text style={{ fontWeight: '700' }}>Filtrar e ordenar</Text>
                                <TouchableOpacity onPress={() => setFiltrando(false)}>
                                  <MaterialIcons name='close' size={25}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.divider}/>
                            <View style={{paddingVertical: 20, paddingHorizontal: 20, gap: 15}}>
                              <Text style={{color: "gray"}}>
                                Status
                              </Text>
                              <View style={{flexDirection: "column", gap: 10}}>
                                <TouchableOpacity 
                                  style={styles.filterItems} 
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    toggleStatus(StatusTypes.Rascunho)
                                  }}>
                                    <RadioButton box selected={filter.status?.includes(StatusTypes.Rascunho)}
                                    onPress={() => {
                                    toggleStatus(StatusTypes.Rascunho)
                                  }}/>
                                      <Status status="Rascunho"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  style={styles.filterItems} 
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    toggleStatus(StatusTypes.Enviado)
                                  }}>
                                    <RadioButton box selected={filter.status?.includes(StatusTypes.Enviado)}
                                    onPress={() => {
                                    toggleStatus(StatusTypes.Enviado)
                                  }}/>
                                    <Status status="Enviado"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  style={styles.filterItems} 
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    toggleStatus(StatusTypes.Aprovado)
                                  }}>
                                    <RadioButton box selected={filter.status?.includes(StatusTypes.Aprovado)}
                                    onPress={() => {
                                    toggleStatus(StatusTypes.Aprovado)
                                  }}/>
                                      <Status status="Aprovado"/>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                  style={styles.filterItems} 
                                  activeOpacity={0.8}
                                  onPress={() => {
                                    toggleStatus(StatusTypes.Recusado)
                                  }}>
                                    <RadioButton box selected={filter.status?.includes(StatusTypes.Recusado)}
                                    onPress={() => {
                                    toggleStatus(StatusTypes.Recusado)
                                  }}/>
                                    <Status status="Recusado"/>
                                </TouchableOpacity>
                              </View>
                              <Text style={{color: 'gray'}}>Ordenação</Text>
                              <View style={{flexDirection: "column", gap: 10}}>
                                  <TouchableOpacity style={styles.filterItems}
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "date", order: "desc"})
                                  )}>
                                    <RadioButton 
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "date", order: "desc"})
                                    )}
                                    selected={filter.order === "desc" && filter.orderBy === "date"}
                                    />
                                    <Text>Mais recente</Text>
                                  </TouchableOpacity >
                                  <TouchableOpacity style={styles.filterItems}
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "date", order: "asc"})
                                  )}>
                                    <RadioButton 
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "date", order: "asc"})
                                    )}
                                    selected={ filter.order === "asc" && filter.orderBy === "date"}
                                    />
                                    <Text>Mais antigo</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.filterItems}
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "price", order: "desc"})
                                  )}>
                                    <RadioButton
                                     onPress={() => setFilter(prev => ({...prev, orderBy: "price", order: "desc"})
                                    )}
                                    selected={filter.order === "desc" && filter.orderBy === "price"}
                                    />
                                    <Text>Maior Valor</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.filterItems}
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "price", order: "asc"})
                                  )}>
                                    <RadioButton 
                                    onPress={() => setFilter(prev => ({...prev, orderBy: "price", order: "asc"})
                                    )}
                                    selected={filter.order === "asc" && filter.orderBy === "price"}
                                    />
                                    <Text>Menor valor</Text>
                                  </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.divider}/>
                            <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: 20, gap: 15}}>
                              <View>
                                    <Button variant='gray'
                                    onPress={() => setFilter({
                                      status: undefined,
                                      order: undefined,
                                      orderBy: undefined
                                    })}>
                                      <Text style={{color: "#6A46EB", fontWeight: 600, padding: 4}}>Resetar filtros</Text>  
                                    </Button>
                              </View>
                              <View>
                                <Button variant='purple'
                                onPress={async () => {
                                  const effectiveFilter = {
                                    ...filter,
                                    status: filter.status && filter.status.length > 0 ? filter.status : undefined
                                  }
                                  const filteredQuotes = await filterQuotes(allQuotes, effectiveFilter)
                                  setQuotes(filteredQuotes)
                                  setFiltrando(false)
                                }}>
                                  <MaterialIcons name='check' size={20} color={'white'}/>
                                  <Text 
                                    style={{
                                      color: "white", 
                                      fontWeight: 600, 
                                      padding: 4, 
                                      paddingHorizontal: 5, 
                                      paddingRight: 10
                                    }}
                                  >
                                    Aplicar
                                  </Text>  
                                </Button>
                              </View>
                            </View>
                        </View>
                </View>
            )}
          
    </View>
      )
}

