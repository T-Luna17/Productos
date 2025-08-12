import {
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
} from "./services/servicesProductos";

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  document.getElementById("productoForm").addEventListener("submit", guardarProducto);
});

async function cargarProductos() {
  const productos = await obtenerProductos();
  const tbody = document.getElementById("productosTable");
  tbody.innerHTML = "";

  productos.forEach(prod => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${prod.nombre}</td>
      <td>${prod.precio}</td>
      <td>${prod.stock}</td>
      <td>
        <button class="edit" onclick="editarProducto(${prod.id})">Editar</button>
        <button class="delete" onclick="eliminarProductoHandler(${prod.id})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

async function guardarProducto(e) {
  e.preventDefault();

  const id = document.getElementById("productoId").value;
  const producto = {
    nombre: document.getElementById("nombre").value,
    precio: parseFloat(document.getElementById("precio").value),
    stock: parseInt(document.getElementById("stock").value)
  };

  if (id) {
    await actualizarProducto(id, producto);
  } else {
    await crearProducto(producto);
  }

  document.getElementById("productoForm").reset();
  document.getElementById("productoId").value = "";
  cargarProductos();
}

async function editarProducto(id) {
  const producto = await obtenerProductoPorId(id);
  document.getElementById("productoId").value = producto.id;
  document.getElementById("nombre").value = producto.nombre;
  document.getElementById("precio").value = producto.precio;
  document.getElementById("stock").value = producto.stock;
}

async function eliminarProductoHandler(id) {
  if (confirm("¿Seguro que quieres eliminar este producto?")) {
    await eliminarProducto(id);
    cargarProductos();
  }
}
