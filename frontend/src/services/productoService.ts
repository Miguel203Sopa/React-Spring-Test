
import type { Producto } from "../types/Producto.ts";

const API_URL = "http://localhost:8080/api/productos";

export async function getProductos(): Promise<Producto[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Error al obtener los productos");
    }

    return response.json();
}

export async function getProductoById(id: number): Promise<Producto> {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Error al obtener el producto");
    }

    return response.json();
}

export async function createProducto(producto: Omit<Producto, "id" | "createdAt" | "updatedAt">): Promise<Producto> {
    const response = await fetch(API_URL,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),

    });

    if (!response.ok) {
        throw new Error("Error al crear el producto");
    }

    return response.json();
}

export async function updateProducto(id: number
    , producto: Omit<Producto, "id" | "createdAt" | "updatedAt">
): Promise<Producto> {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar el producto");
    }

    return response.json();
}

export async function deleteProducto(id: number): Promise<void> {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Error al eliminar el producto");
    }
}