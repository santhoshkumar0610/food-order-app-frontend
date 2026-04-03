export type Product = {
    id: number,
    name: string,
    price: number
}

export type Order = {
    id: number,
    total_amount: number,
    status: string
}

export type LoginResponse = {
    token?: string,
    message?: string
}