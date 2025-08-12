const API_URL = "http://localhost:3000/productos";

// Obtener todos los productos
export async function obtenerProductos() {
  const res = await fetch(API_URL);
  return await res.json();
}

// Crear producto
export async function crearProducto(producto) {
  return await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
}

// Obtener producto por ID
export async function obtenerProductoPorId(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
}

// Actualizar producto
export async function actualizarProducto(id, producto) {
  return await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(producto)
  });
}

// Eliminar producto
export async function eliminarProducto(id) {
  return await fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
