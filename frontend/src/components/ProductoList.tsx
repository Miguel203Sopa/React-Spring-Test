import { useEffect, useState } from "react";
import type { Producto } from "../types/Producto.ts";

import {
    getProductos,
    deleteProducto
} from "../services/productoService.ts";

import ProductoForm from "./ProductoForm.tsx";

function ProductoList() {

    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [productoEditar, setProductoEditar] =
        useState<Producto | null>(null);


    useEffect(() => {

        const cargarProductos = async () => {

            try {

                const data = await getProductos();

                setProductos(data);

            } catch (error) {

                console.error(error);

                setError("No se pudieron cargar los productos.");

            } finally {

                setLoading(false);
            }
        };

        cargarProductos();

    }, []);


    const handleProductoCreado = (producto: Producto) => {

        setProductos((productosActuales) => [
            ...productosActuales,
            producto
        ]);

    };


    const handleProductoActualizado = (producto: Producto) => {

        setProductos((productosActuales) =>
            productosActuales.map((p) =>
                p.id === producto.id
                    ? producto
                    : p
            )
        );

        setProductoEditar(null);
    };


    const handleEliminar = async (id: number) => {

        try {

            await deleteProducto(id);

            setProductos((productosActuales) =>
                productosActuales.filter(
                    (p) => p.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Error al eliminar el producto:",
                error
            );

        }
    };


    const handleCancelarEdicion = () => {
        setProductoEditar(null);
    };


    if (loading) {
        return <p>Cargando productos...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div>

            <h2>Productos</h2>

            <ProductoForm
                productoEditar={productoEditar}
                onProductoCreado={handleProductoCreado}
                onProductoActualizado={handleProductoActualizado}
                onCancelarEdicion={handleCancelarEdicion}
            />


            {productos.length === 0 ? (

                <p>No hay productos registrados.</p>

            ) : (

                <ul>

                    {productos.map((producto) => (

                        <li key={producto.id}>

                            {producto.name} - ${producto.price} - ${producto.createdAt} - ${producto.updatedAt}

                            {" "}

                            <button
                                onClick={() =>
                                    setProductoEditar(producto)
                                }
                            >
                                Editar
                            </button>

                            {" "}

                            <button
                                onClick={() =>
                                    handleEliminar(producto.id)
                                }
                            >
                                Eliminar
                            </button>

                        </li>

                    ))}

                </ul>
            )}

        </div>
    );
}

export default ProductoList;