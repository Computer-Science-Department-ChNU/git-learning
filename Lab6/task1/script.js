class Category {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class Product {
    constructor(id, name, price, categoryId, image, createdAt = new Date(), updatedAt = new Date()) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.image = image;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let products = new Map();
    let categories = new Map();
    let productId = 1;
    let allProductsPrice = 0;
    let editingProductId = null;

    let greenColor = "#4cc629";
    let redColor = "#ff0000";
    categories.set(1, "Техніка");
    categories.set(2, "Їжа");

    const modalWrapper = document.getElementById("modalWrapper");
    const addButton = document.querySelector(".add");
    const productList = document.querySelector(".list-cards");
    const closeModal = document.getElementById("closeModal");
    const submitProductBtn = document.getElementById("submitProduct");
    const textWarning = document.getElementById("warningText");
    const infoPrice = document.getElementById("infoPrice");
    const filterButtons = document.getElementById("filterButtons");
    const sortingButtons = document.getElementById("sortingButtons");

    const productName = document.getElementById("productName");
    const productPrice = document.getElementById("productPrice");
    const productImage = document.getElementById("productImage");
    const productCategory = document.getElementById("productCategory");

    checkProducts();
    fillCategories();
    createFilterButtons();
    changeInfoPrice();

    addButton.addEventListener("click", () => { modalWrapper.style.display = "flex"; });
    closeModal.addEventListener("click", () => clearSubmitPanel());
    submitProductBtn.addEventListener("click", () => submitProduct());
    productList.addEventListener("click", (e) => changeOrDeleteProduct(e));
    filterButtons.addEventListener("click", (e) => {
       if (!e.target.classList.contains("info-btn") && !e.target.classList.contains("filter")) return;

       document.querySelectorAll(".info-btn.filter").forEach(btn => {btn.classList.remove("active");});
       e.target.classList.add("active");

        const categoryId = e.target.dataset.category;
        filterProductsByCategory(categoryId);
    });
    sortingButtons.addEventListener("click", (e) => {
       if (!e.target.classList.contains("sort")) return;

       const sortType = e.target.dataset.sort;
       sortProducts(sortType);
    });

    function showSnackbar(message, color = "#333") {
        const snackbar = document.getElementById("snackbar");
        snackbar.textContent = message;
        snackbar.style.backgroundColor = color;
        snackbar.classList.add("show");

        setTimeout(() => {
            snackbar.classList.remove("show");
        }, 3000);
    }

    function clearSubmitPanel() {
        modalWrapper.style.display = "none";
        productName.value = "";
        productPrice.value = "";
        productImage.value = "";
        submitProductBtn.innerText = "Додати";
    }

    function sortProducts(type) {
        let sorted = Array.from(products.values());

        switch (type) {
            case "price":
                sorted.sort((a, b) => a.price - b.price);
                break;
            case "created":
                sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case "updated":
                sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                break;
            case "reset":
            default:
                sorted.sort((a, b) => a.id - b.id);
                break;
        }

        renderSortedProducts(sorted);
    }

    function renderSortedProducts(sortedProducts) {
        const productList = document.querySelector(".list-cards");
        const addCard = document.querySelector(".card.add");

        document.querySelectorAll(".list-cards .card:not(.add)").forEach(card => card.remove());

        sortedProducts.forEach(product => {
           const li = document.createElement("li");
           let category = categories.get(parseInt(product.categoryId));

           li.className = "card";
           li.setAttribute("data-product-id", product.id);
           li.innerHTML =`
                <img class="card-img-top" src="${product.image}" alt="${product.name}">
                <div class="card-body">
                    <h6 class="card-title">${product.name}</h6>
                    <p class="card-price">$${product.price}</p>
                    <p class="card-text">${category}</p>
                    <div class="btn-adjust">
                        <a href="#" class="btn-primary change" id="changeProduct">Змінити</a>
                        <a href="#" class="btn-primary delete" id="deleteProduct">Видалити</a>
                    </div>
                </div>
           `;
           productList.insertBefore(li, addCard);
        });

        changeInfoPrice();
    }

    function filterProductsByCategory(categoryId) {
        const cards = document.querySelectorAll(".list-cards .card:not(.add)");

        cards.forEach(card => {
            const productId = parseInt(card.dataset.productId);
            const product = products.get(productId);

            if (categoryId === "all" || product.categoryId === categoryId) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    function createFilterButtons() {
        categories.forEach((name, id) => {
            const btn = document.createElement("button");
            btn.classList.add("info-btn");
            btn.classList.add("filter");
            btn.setAttribute("data-category", id);
            btn.textContent = name;
            filterButtons.appendChild(btn);
        });
    }

    function fillCategories() {
        categories.forEach((name, id) => {
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("category-item");

            const label = document.createElement("label");
            label.textContent = name;

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.id = `category-${id}`;
            radio.name = "productCategory";
            radio.value = id; // <input type="radio" id="category-1" name="productCategory" value="1">

            categoryDiv.appendChild(radio);
            categoryDiv.appendChild(label);
            productCategory.appendChild(categoryDiv);
        });
    }

    function changeInfoPrice() {
        allProductsPrice = 0;
        const productList = document.querySelectorAll(".list-cards .card:not(.add)");
        productList.forEach(product => {
            const priceText = product.querySelector(".card-price").textContent.replace("$", "");
            const price = parseFloat(priceText);
            if (!isNaN(price)) {
                allProductsPrice += price;
            }
        });
        infoPrice.textContent = allProductsPrice + "$";
    }

    function checkProducts() {
        if (products.size === 0) {
            textWarning.style.display = "block";
        } else {
            textWarning.style.display = "none";
        }
    }

    function changeOrDeleteProduct(e) {
        const card = e.target.closest(".card");

        if (e.target.classList.contains("change")) {
            const title = card.querySelector(".card-title").textContent;
            const price = card.querySelector(".card-price").textContent.replace("$", "");

            productName.value = title;
            productPrice.value = price;
            editingProductId = card.dataset.productId;

            submitProductBtn.innerText = "Змінити";
            modalWrapper.style.display = "flex";
        }

        if (e.target.classList.contains("delete")) {
            products.delete(parseInt(card.dataset.productId));
            card.remove();
            checkProducts();
            changeInfoPrice();
            showSnackbar("Товар успішно видалено!", greenColor);
        }
    }



    function submitProduct() {
        const name = productName.value.trim();
        const price = parseFloat(productPrice.value);
        const imageFile = productImage.files[0];
        const category = document.querySelector(`input[name="productCategory"]:checked`);

        if (!name || isNaN(price) || !imageFile || !category) {
            showSnackbar("Будь ласка, заповніть всі поля!", redColor);
            return;
        }

        const reader = new FileReader();

        reader.onload = function (e) {
            const imageUrl = e.target.result; // URL
            const categoryId = category.value;

            if (editingProductId !== null) {
                const product = products.get(parseInt(editingProductId));
                product.name = name;
                product.price = price;
                product.categoryId = categoryId;
                product.image = imageUrl;
                product.updatedAt = new Date();

                const card = document.querySelector(`.card[data-product-id="${editingProductId}"]`);
                if (card) {
                    card.querySelector(".card-title").textContent = product.name;
                    card.querySelector(".card-price").textContent = `$${product.price}`;
                    card.querySelector(".card-text").textContent = categories.get(parseInt(product.categoryId));
                    card.querySelector("img").src =String(product.image);
                }

                editingProductId = null;
                showSnackbar("Товар успішно оновлено.", greenColor);
            } else {
                const newProduct = new Product(productId++, name, price, categoryId, imageUrl, new Date(), new Date());
                addProduct(newProduct);
                showSnackbar("Товар успішно додано.", greenColor);
            }

            clearSubmitPanel();
            changeInfoPrice();
        }

        reader.readAsDataURL(imageFile); // читає зображення як base64
    }

    function addProduct(product) {
        products.set(product.id, product);
        let category = categories.get(parseInt(product.categoryId));

        const productList = document.querySelector(".list-cards");
        const li = document.createElement("li");

        li.className = "card";
        li.setAttribute("data-product-id", product.id);
        li.innerHTML = `
            <img class="card-img-top" src="${product.image}" alt="${product.name}">
            <div class="card-body">
                <h6 class="card-title">${product.name}</h6>
                <p class="card-price">$${product.price}</p>
                <p class="card-text">${category}</p>
                <div class="btn-adjust">
                    <a href="#" class="btn-primary change" id="changeProduct">Змінити</a>
                    <a href="#" class="btn-primary delete" id="deleteProduct">Видалити</a>
                </div>
            </div>
        `;

        const addCard = document.querySelector(".card.add");
        productList.insertBefore(li, addCard);
        checkProducts();
    }
});