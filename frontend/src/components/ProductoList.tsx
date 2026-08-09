import {useEffect, useState} from "react";
import type { Producto } from "../types/Producto.ts";
import {getProductos} from "../services/productoService.ts";

function ProductoList(){
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    if (loading) {
        return <p>Cargando productos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Productos</h2>
        
        {productos.length === 0 ? (
            <p>No hay productos registrados.</p>
        ) : (
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.name} - ${producto.price}
                    </li>
                ))}
            </ul>
        )}
        </div>
    );
}

export default ProductoList;