import { getProducts, createProduct, updateProduct, deleteProduct } from '../services/servicesProductos.js';

const form = document.getElementById('product-form');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const stockInput = document.getElementById('stock');
const productIdInput = document.getElementById('product-id');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const messageEl = document.getElementById('message');
const productsBody = document.getElementById('products-body');
const searchInput = document.getElementById('search');

let products = [];
let editing = false;

// ✅ Cargar productos al inicio
document.addEventListener('DOMContentLoaded', loadProducts);

async function loadProducts() {
  products = await getProducts();
  renderProducts(products);
}

// ✅ Renderizar tabla
function renderProducts(data) {
  productsBody.innerHTML = '';
  if (data.length === 0) {
    productsBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No hay productos</td></tr>`;
    return;
  }

  data.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${product.name}</td>
      <td>₡${product.price.toFixed(2)}</td>
      <td>${product.stock}</td>
      <td>
        <button class="btn small edit-btn">Editar</button>
        <button class="btn small danger delete-btn">Eliminar</button>
      </td>
    `;

    tr.querySelector('.edit-btn').addEventListener('click', () => startEdit(product));
    tr.querySelector('.delete-btn').addEventListener('click', () => confirmDelete(product.id));

    productsBody.appendChild(tr);
  });
}

// ✅ Manejar envío del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value);
  const stock = parseInt(stockInput.value);

  if (!name || isNaN(price) || isNaN(stock)) {
    showMessage('Por favor, complete todos los campos correctamente.', 'error');
    return;
  }

  const productData = { name, price, stock };

  if (editing) {
    const id = parseInt(productIdInput.value);
    await updateProduct(id, productData);
    showMessage('Producto actualizado con éxito.', 'success');
  } else {
    await createProduct(productData);
    showMessage('Producto agregado con éxito.', 'success');
  }

  resetForm();
  loadProducts();
});

// ✅ Función para iniciar edición
function startEdit(product) {
  editing = true;
  productIdInput.value = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  stockInput.value = product.stock;

  saveBtn.textContent = 'Actualizar';
  cancelBtn.classList.remove('hidden');
  document.getElementById('form-title').textContent = 'Editar Producto';
}

// ✅ Cancelar edición
cancelBtn.addEventListener('click', resetForm);

function resetForm() {
  editing = false;
  productIdInput.value = '';
  nameInput.value = '';
  priceInput.value = '';
  stockInput.value = '';
  saveBtn.textContent = 'Guardar';
  cancelBtn.classList.add('hidden');
  document.getElementById('form-title').textContent = 'Nuevo Producto';
}

// ✅ Eliminar producto
async function confirmDelete(id) {
  if (confirm('¿Seguro que deseas eliminar este producto?')) {
    await deleteProduct(id);
    showMessage('Producto eliminado.', 'success');
    loadProducts();
  }
}

// ✅ Mostrar mensajes temporales
function showMessage(text, type = 'info') {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  setTimeout(() => {
    messageEl.textContent = '';
    messageEl.className = 'message';
  }, 3000);
}

// ✅ Buscar productos en tiempo real
searchInput.addEventListener('input', (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  renderProducts(filtered);
});
