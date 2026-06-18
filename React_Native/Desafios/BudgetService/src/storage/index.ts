import { FilterOptions, QuoteDocTypes, StatusTypes } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@quotes"

export async function getQuotes() {
    const storage = await AsyncStorage.getItem(STORAGE_KEY)

    if(!storage) {
        return []
    }

    return JSON.parse(storage) as QuoteDocTypes[]
}

export async function getQuoteById(id: string) {
    const quotes = await getQuotes()

    return quotes.find(quote => quote.id === id)
}

export async function getQuoteByStatus(status: StatusTypes): Promise<Number> {
    const quotes = await getQuotes()

    const quotesWithStatus = quotes.filter((item) => item.status === status).length

    return quotesWithStatus
}

export async function newQuote(quote: QuoteDocTypes) {
    const quotes = await getQuotes()

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...quotes, quote]))
}

export async function updateQuote(updatedQuote: QuoteDocTypes) {
    const quotes = await getQuotes()

    const updatedQuotes = quotes.map(quote => quote.id === updatedQuote.id ? updatedQuote : quote)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes))
}

export async function deleteQuote(id: string) {
    const quotes = await getQuotes()

    const updatedQuotes = quotes.filter(quote => quote.id !== id )

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedQuotes))
}

export async function duplicateQuote(quote: QuoteDocTypes) {
    const quotes = await getQuotes()

    console.log("Original", quote.id)

    const copy: QuoteDocTypes = {
        ...quote, 
        id: String(Date.now()), 
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
        items: quote.items.map(item => ({
            ...item,
            id: String(`${Date.now()} - ${Math.random()}`)
        }))
    }

    console.log("Copia", copy.id)

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...quotes, copy]))
}

function getQuoteTotal(quote: QuoteDocTypes) {
        const subtotal = quote.items.reduce(
            (total, item) => total + item.price * item.qty,
            0
        )

        return subtotal * (1 - (quote.discountPct ?? 0) / 100)
    }

export async function filterQuotes(quotes: QuoteDocTypes[], filters: FilterOptions) {
    let result = [...quotes]

    if(filters.status && filters.status.length > 0) {
        const statuses: StatusTypes[] = Array.isArray(filters.status)
        ? filters.status
        : [filters.status]
        
        result = result.filter(
            quote => statuses.includes(quote.status)
        )
    }

    if (filters.orderBy === 'price') {
        result.sort((a, b) => filters.order === 'asc' 
        ? getQuoteTotal(a) - getQuoteTotal(b)
        : getQuoteTotal(b) - getQuoteTotal(a))
    }

    if(filters.orderBy === 'date') {
        result.sort((a, b) => {
        const dateA = a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0

        const dateB = b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0

        return filters.order === 'asc'
            ? dateA - dateB
            : dateB - dateA
    })
    }

    return result
}