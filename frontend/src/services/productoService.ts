import axios from "axios";

import type { Producto } from "../types/Producto.ts";

const API_URL = "http://localhost:8080/api/productos";

export const getProductos= async (): Promise<Producto[]> => {
    const response = await axios.get<Producto[]>(API_URL);
    return response.data;
}