import { useEffect, useState } from "react"
import { createOrder, getProducts } from "../services/api"
import type { Product } from "../types"
import { useNavigate } from "react-router-dom";

export default function Products() {

    const [products, setProducts] = useState<Product[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        loadProduct()
    }, []);

    const loadProduct = () => {
        getProducts().then(setProducts);
    }

    const order = async (data: Product) => {
        const res = await createOrder({
            total: data.price,
            items: [
                { "product_id": data.id, "quantity": 1 }
            ]
        });

        if (res.message) {
            alert(res.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    return (
        <div>
            <h2>Products</h2>
            <button onClick={()=>navigate("/orders")}>
                Go to Orders
            </button>
            {products.map((p) =>
                <div key={p.id}>
                    {p.name} - {p.price}
                    <button onClick={() => order(p)}>Order</button>
                </div>
            )}
            <br/>
            <button onClick={logout}>Log Out</button>
        </div>
    )
}