import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    quoteContainer: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    width: '100%',
    },
    budgetCards: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        flexDirection: "column",
        gap: 4,
    },
    divider: {
    height: 1,
    backgroundColor: '#000', 
    width: '100%',
    marginVertical: 8
  },
})