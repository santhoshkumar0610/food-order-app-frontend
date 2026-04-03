import type { LoginResponse, Product, Order } from "../types";

const BASE_URL = import.meta.env.VITE_API_URL;

const getToken = (): string | null => localStorage.getItem("token");

const getHeaders = (): HeadersInit => ({
    "Content-type": "application/json",
    Authorization: `${getToken()}`
});

//Login
export const login = async (data: {
    email: string,
    password: string
}): Promise<LoginResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data)
    })
    return res.json();
}

//Products
export const getProducts = async (): Promise<Product[]> => {
    const res = await fetch(`${BASE_URL}/products`)
    return res.json()
}

//Create Order
export const createOrder = async (data: { total: number, items: { product_id: number, quantity: number }[] }): Promise<{ message: string }> => {
    const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(data)
    })
    return res.json();
}

//Get Orders
export const getOrder = async (): Promise<Order[]> => {
    const res = await fetch(`${BASE_URL}/orders`, {
        headers: getHeaders()
    })
    return res.json();
}

//Update Orders
export const updateOrders = async (id: number, status: "PENDING" | "PAID"): Promise<{ message: string }> => {
    const res = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({ status })
    })
    return res.json()
}