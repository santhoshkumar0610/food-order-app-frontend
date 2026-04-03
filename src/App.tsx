import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Orders from "./pages/Order";
import Products from "./pages/Product";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*Public Routes*/}
        <Route path="/" element={<Login />} />

        {/*Protected Routes */}
        <Route
          path="/products"
          element={<ProtectedRoutes>
            <Products />
          </ProtectedRoutes>} />
        <Route
          path="/orders"
          element={<ProtectedRoutes>
            <Orders />
          </ProtectedRoutes>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;