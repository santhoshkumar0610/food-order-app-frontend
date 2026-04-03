import { useEffect, useState } from "react"
import type { Order } from "../types"
import { getOrder, updateOrders } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Orders() {

    const [orders, setOrders] = useState<Order[]>([])

    const navigate = useNavigate()

    useEffect(() => {
        loadOrder()
    }, [])

    const loadOrder = () => {
        getOrder().then((data: Order[]) => setOrders(data));
    }

    const markPaid = async (id: number) => {
        await updateOrders(id, "PAID");
        loadOrder()
    }

    return (
        <div>
            <h2>Orders</h2>
            <button onClick={() => navigate("/products")}>
                Back to products
            </button>

            {orders.length && orders.map((o) => (
                <div key={o.id}>
                    Order #{o.id} - ₹{o.total_amount} - {o.status}

                    {o.status === "PENDING" && (
                        <button onClick={() => markPaid(o.id)}>Mark Paid</button>
                    )}
                </div>
            ))}
        </div>
    )
}