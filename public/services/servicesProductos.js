// services.js
const API_URL = "http://localhost:3001/products";

/**
 * Obtiene la lista de productos
 * @param {string} query - filtro opcional por nombre
 */
export async function getProducts(query = "") {
  try {
    const url = query ? `${API_URL}?q=${encodeURIComponent(query)}` : API_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Error al obtener productos (${res.status})`);
    return await res.json();
  } catch (error) {
    console.error("getProducts:", error);
    throw error;
  }
}

/**
 * Crea un producto nuevo
 * @param {Object} product - { name, price, stock }
 */
export async function createProduct(product) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error(`Error al crear producto (${res.status})`);
    return await res.json();
  } catch (error) {
    console.error("createProduct:", error);
    throw error;
  }
}

/**
 * Actualiza un producto
 * @param {string|number} id
 * @param {Object} product
 */
export async function updateProduct(id, product) {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    if (!res.ok) throw new Error(`Error al actualizar producto (${res.status})`);
    return await res.json();
  } catch (error) {
    console.error("updateProduct:", error);
    throw error;
  }
}

/**
 * Elimina un producto por ID
 * @param {string|number} id
 */
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Error al eliminar producto (${res.status})`);
    return true;
  } catch (error) {
    console.error("deleteProduct:", error);
    throw error;
  }
}

/**
 * Obtiene un producto específico
 * @param {string|number} id
 */
export async function getProductById(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error(`Error al obtener producto (${res.status})`);
    return await res.json();
  } catch (error) {
    console.error("getProductById:", error);
    throw error;
  }
}
