const API_URL = "http://localhost:3001/productos"; 

export const getProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error al obtener productos");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createProduct = async (product) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Error al crear producto");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error("Error al actualizar producto");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Error al eliminar producto");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
