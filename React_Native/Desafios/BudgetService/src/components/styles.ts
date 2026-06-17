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
        borderColor: '#E6E5E5',
        borderRadius: 8,
        flexDirection: "column",
        gap: 4,
    },
    divider: {
    height: 1,
    backgroundColor: '#E6E5E5', 
    width: '100%',
    marginVertical: 8
  },
  buttonContainerV1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6A46EB',
    borderRadius: 20,
    padding: 9,
    gap: 5
  },
  buttonContainerV2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: '#E6E5E5',
    borderRadius: 22,
    padding: 9,
    gap: 5
  }
})