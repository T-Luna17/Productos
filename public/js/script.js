import { getProducts, createProduct, updateProduct, deleteProduct, getProductById } from "./services.js";

const $ = (sel) => document.querySelector(sel);
const form = $("#product-form");
const message = $("#message");
const productsBody = $("#products-body");
const formTitle = $("#form-title");
const saveBtn = $("#save-btn");
const cancelBtn = $("#cancel-btn");
const searchInput = $("#search");

function showMessage(text, type = "info") {
  message.textContent = text;
  message.className = `message ${type === "error" ? "error" : type === "success" ? "success" : ""}`;
}
function clearMessageAfter(ms = 2000) {
  setTimeout(() => showMessage(""), ms);
}

function formToProduct() {
  return {
    name: $("#name").value.trim(),
    price: parseFloat($("#price").value),
    stock: parseInt($("#stock").value, 10)
  };
}

function resetForm() {
  form.reset();
  $("#product-id").value = "";
  formTitle.textContent = "Nuevo Producto";
  saveBtn.textContent = "Guardar";
  cancelBtn.classList.add("hidden");
}

function renderProducts(list = []) {
  if (!Array.isArray(list)) list = [];
  productsBody.innerHTML = list.map(p => `
    <tr>
      <td>${escapeHtml(p.name)}</td>
      <td>₡ ${Number(p.price).toLocaleString("es-CR", {minimumFractionDigits:2})}</td>
      <td>${Number(p.stock)}</td>
      <td>
        <button class="btn secondary" data-edit="${p.id}">Editar</button>
        <button class="btn danger" data-del="${p.id}">Eliminar</button>
      </td>
    </tr>
  `).join("") || `
    <tr><td colspan="4">No hay productos registrados.</td></tr>
  `;
}

function escapeHtml(str = "") {
  return str.replace(/[&<>"']/g, m => (
    { "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[m]
  ));
}

// Eventos
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const initial = await getProducts();
    renderProducts(initial);
  } catch {
    showMessage("No se pudo cargar la lista", "error");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const { name, price, stock } = formToProduct();
  if (!name || isNaN(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
    showMessage("Datos inválidos", "error");
    return;
  }
  const editingId = $("#product-id").value;
  try {
    if (editingId) {
      await updateProduct(editingId, { name, price, stock });
      showMessage("Producto actualizado", "success");
    } else {
      await createProduct({ name, price, stock });
      showMessage("Producto creado", "success");
    }
    const list = await getProducts(searchInput.value.trim());
    renderProducts(list);
    resetForm();
    clearMessageAfter();
  } catch {
    showMessage("Error en la operación", "error");
  }
});

cancelBtn.addEventListener("click", resetForm);

productsBody.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  if (btn.dataset.edit) {
    try {
      const p = await getProductById(btn.dataset.edit);
      $("#product-id").value = p.id;
      $("#name").value = p.name;
      $("#price").value = p.price;
      $("#stock").value = p.stock;

      formTitle.textContent = "Editar Producto";
      saveBtn.textContent = "Actualizar";
      cancelBtn.classList.remove("hidden");
      showMessage(`Editando "${p.name}"`);
    } catch {
      showMessage("Error al cargar producto", "error");
    }
  }

  if (btn.dataset.del) {
    const ok = confirm("¿Seguro que deseas eliminar este producto?");
    if (!ok) return;
    try {
      await deleteProduct(btn.dataset.del);
      const list = await getProducts(searchInput.value.trim());
      renderProducts(list);
      showMessage("Producto eliminado", "success");
      clearMessageAfter();
    } catch {
      showMessage("No se pudo eliminar", "error");
    }
  }
});

let searchTimer;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(async () => {
    try {
      const list = await getProducts(searchInput.value.trim());
      renderProducts(list);
    } catch {
      showMessage("Error en la búsqueda", "error");
    }
  }, 300);
});
