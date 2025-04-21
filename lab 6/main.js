let products = [];
let filterCategory = null;
let sortKey = null;
let imageData = ""; // тимчасово зберігатиме закодоване зображення
const productList = document.getElementById("product-list");
const totalPriceEl = document.getElementById("total-price");
const emptyMessage = document.getElementById("empty-message");

// DOM вузли
const modal = document.getElementById("modal");
const toast = document.getElementById("toast");
const form = document.getElementById("product-form");
const modalTitle = document.getElementById("modal-title");

const nameInput = document.getElementById("product-name");
const priceInput = document.getElementById("product-price");
const categoryInput = document.getElementById("product-category");
const imageInput = document.getElementById("product-image");
const idInput = document.getElementById("product-id");


document.getElementById("add-product-button").onclick = () => openModal();
document.getElementById("cancel-button").onclick = () => closeModal();
document.getElementById("reset-filter").onclick = () => {
    filterCategory = null;
    renderProducts();
};
document.getElementById("sort-price").onclick = () => {
    sortKey = "price";
    renderProducts();
};
document.getElementById("sort-created").onclick = () => {
    sortKey = "created";
    renderProducts();
};
document.getElementById("sort-updated").onclick = () => {
    sortKey = "updated";
    renderProducts();
};
document.getElementById("reset-sorting").onclick = () => {
    sortKey = null;
    renderProducts();
};


// Обробка форми
form.onsubmit = (e) => {
    e.preventDefault();
    const id = idInput.value || generateId();
    const product = {
        id,
        name: nameInput.value.trim(),
        price: parseFloat(priceInput.value),
        category: categoryInput.value.trim(),
        image: imageData || findProduct(id)?.image || "",
        created: idInput.value ? findProduct(id).created : Date.now(),
        updated: Date.now()
    };

    if (idInput.value) {
        updateProduct(product);
    } else {
        products.push(product);
        showToast(`Товар "${product.name}" додано.`);
    }

    imageData = "";
    closeModal();
    renderProducts();
};


// Обробник завантаження зображення
imageInput.addEventListener("change", handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            imageData = reader.result; // Data URL
        };
        reader.readAsDataURL(file);
    }
}


// Утиліти
const generateId = () => Math.random().toString(36).substr(2, 9);

const findProduct = (id) => products.find(p => p.id === id);

const updateProduct = (updated) => {
    products = products.map(p => (p.id === updated.id ? updated : p));
    showToast(`Товар #${updated.id} "${updated.name}" оновлено.`);
};

const deleteProduct = (id) => {
    const product = findProduct(id);
    products = products.filter(p => p.id !== id);
    showToast(`Товар "${product.name}" видалено.`);
    renderProducts();
};

const openModal = (product = null) => {
    modal.classList.remove("hidden");
    form.reset();
    idInput.value = product?.id || "";
    nameInput.value = product?.name || "";
    priceInput.value = product?.price || "";
    categoryInput.value = product?.category || "";
    imageData = product?.image || "";
    modalTitle.textContent = product ? "Редагувати товар" : "Новий товар";
};

const closeModal = () => {
    modal.classList.add("hidden");
};


// Рендеринг
const renderProducts = () => {
    productList.innerHTML = "";

    const visibleProducts = getFilteredAndSortedProducts();

    if (visibleProducts.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

    visibleProducts.forEach(p => {
        const card = createProductCard(p);
        productList.appendChild(card);
    });

    renderCategories();
    updateTotalPrice(visibleProducts);
};

const createProductCard = (p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
    <img src="${p.image}" alt="${p.name}" />
    <div class="product-info">
      <p><strong>ID:</strong> ${p.id}</p>
      <p><strong>Назва:</strong> ${p.name}</p>
      <p><strong>Ціна:</strong> ${p.price.toFixed(2)} грн</p>
      <p><strong>Категорія:</strong> ${p.category}</p>
    </div>
    <div class="product-actions">
      <button onclick="handleEdit('${p.id}')">Редагувати</button>
      <button onclick="handleDelete('${p.id}')">Видалити</button>
    </div>
  `;
    return card;
};

const handleEdit = (id) => {
    const product = findProduct(id);
    openModal(product);
};

const handleDelete = (id) => {
    deleteProduct(id);
};

const updateTotalPrice = (productArray) => {
    const total = productArray.reduce((sum, p) => sum + p.price, 0);
    totalPriceEl.textContent = `Загальна вартість: ${total.toFixed(2)} грн`;
};

const renderCategories = () => {
    const categories = [...new Set(products.map(p => p.category))];
    const container = document.getElementById("category-buttons");
    container.innerHTML = "";

    categories.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category;
        btn.onclick = () => {
            filterCategory = category;
            renderProducts();
        };
        container.appendChild(btn);
    });
};

const getFilteredAndSortedProducts = () => {
    let result = [...products];

    if (filterCategory) {
        result = result.filter(p => p.category === filterCategory);
    }

    if (sortKey === "price") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortKey === "created") {
        result.sort((a, b) => a.created - b.created);
    } else if (sortKey === "updated") {
        result.sort((a, b) => a.updated - b.updated);
    }

    return result;
};


// Toast
const showToast = (message) => {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
};

renderProducts();