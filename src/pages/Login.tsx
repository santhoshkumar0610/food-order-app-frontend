import { useState } from "react"
import type { LoginResponse } from "../types"
import { login } from "../services/api"
import { useNavigate } from "react-router-dom"

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate();

    const handleLogin = async () => {
        const res: LoginResponse = await login({ email, password })
        if (res.token) {
            localStorage.setItem("token", res.token)
            navigate('/products');
        }
        else {
            alert(res.message || "Login failed");
        }
    }

    return (
        <div>
            <h2>Login</h2>

            <input placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} />

            <input type="password" placeholder="password"
                onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
        </div>
    )
}