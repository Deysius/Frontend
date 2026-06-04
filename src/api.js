import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000"
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization =
            `Bearer ${token}`;
    }

    return config;
});

export default api;
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
    children
}) {

    const token = localStorage.getItem(
        "token"
    );

    return token
        ? children
        : <Navigate to="/" />;
}
<Route
    path="/dashboard"
    element={
        <PrivateRoute>
            <Dashboard />
        </PrivateRoute>
    }
/>
const usuario = JSON.parse(
    localStorage.getItem("usuario")
);
{
    usuario.rol === "Administrador" && (
        <button>
            Eliminar
        </button>
    )
}