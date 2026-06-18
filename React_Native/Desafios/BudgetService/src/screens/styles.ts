import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "white", 
        flex: 1,
        paddingBottom: 60,
        paddingTop: 20,
        paddingHorizontal: 20,
        gap: 20
    },
    quoteList: {
        gap: 10,
    },
    divider: {
    height: 1,
    backgroundColor: '#E6E5E5', 
    width: '100%',
  },
  filterItems: {
    flexDirection: 'row', 
    gap: 10
  }
})