

export enum StatusTypes {
    Rascunho = "Rascunho",
    Enviado = "Enviado",
    Aprovado = "Aprovado",
    Recusado = "Recusado"
}

export type ItemTypes = {
    id: string,
    title: string,
    description: string,
    qty: number,
    price: number
}

export type QuoteDocTypes = {
    id: string,
    client: string,
    title: string,
    items: ItemTypes[]
    discountPct: number,
    status: StatusTypes,
    createdAt: string,
    updatedAt: string,
}

export type FilterOptions = {
    status?: StatusTypes
    orderBy?: "date" | "price"
    order?: "asc" | "desc"
}

export type RootStackParamList = {
    home: undefined
    details: undefined | {id: string}
    Orçamento: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList{}
    }
}