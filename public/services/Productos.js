async function obtenerProducto() {
    try {
        const response = await fetch("http://localhost:3001/productos",{
        method: "GET",
        Headers:{
            "Content-Type" : "application/json"
        }
    })

    const productos = await response.json()

    return productos

}
    catch (error) {
        console.error("Tienes un error en conectarse",error)
        throw error
    }
    
}
// Crear producto
async function crearProducto() {
  try {
    const response = await fetch("http://localhost:3001/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      
    });
   const productos = await response.json()
  } catch (error) {
    console.error("Error en crearProducto:", error);
    alert("No se pudo crear el producto");
  }
}

// Obtener producto por ID
async function obtenerProductoPorId(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error("Error al obtener el producto");
    return await response.json();
  } catch (error) {
    console.error("Error en obtenerProductoPorId:", error);
    alert("No se pudo obtener el producto");
    return null;
  }
}

// Actualizar producto
async function actualizarProducto(id, producto) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto)
    });
    if (!res.ok) throw new Error("Error al actualizar el producto");
    return await res.json();
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    alert("No se pudo actualizar el producto");
  }
}

// Eliminar producto
async function eliminarProducto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar el producto");
    return true;
  } catch (error) {
    console.error("Error en eliminarProducto:", error);
    alert("No se pudo eliminar el producto");
    return false;
  }
}
