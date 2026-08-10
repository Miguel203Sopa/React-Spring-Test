import { useEffect, useState } from "react";
import type { Producto } from "../types/Producto.ts";
import {
    createProducto,
    updateProducto
} from "../services/productoService.ts";

interface ProductoFormProps {
    productoEditar: Producto | null;
    onProductoCreado: (producto: Producto) => void;
    onProductoActualizado: (producto: Producto) => void;
    onCancelarEdicion: () => void;
}

function ProductoForm({
    productoEditar,
    onProductoCreado,
    onProductoActualizado,
    onCancelarEdicion
}: ProductoFormProps) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {

        if (productoEditar) {
            setName(productoEditar.name);
            setPrice(String(productoEditar.price));
        } else {
            setName("");
            setPrice("");
        }

    }, [productoEditar]);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        const producto = {
            name: name,
            price: Number(price)
        };

        try {

            if (productoEditar) {

                const productoActualizado = await updateProducto(
                    productoEditar.id,
                    producto
                );

                onProductoActualizado(productoActualizado);

            } else {

                const productoCreado = await createProducto(producto);

                onProductoCreado(productoCreado);
            }

            setName("");
            setPrice("");

        } catch (error) {

            console.error("Error al guardar el producto:", error);

        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label>Nombre:</label>

                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div>
                <label>Precio:</label>

                <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>

            <button type="submit">
                {productoEditar ? "Actualizar" : "Guardar"}
            </button>

            {productoEditar && (
                <button
                    type="button"
                    onClick={onCancelarEdicion}
                >
                    Cancelar
                </button>
            )}

        </form>
    );
}

export default ProductoForm;