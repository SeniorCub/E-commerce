document.querySelector(".carts").style.display = "none";

document.querySelector(".car").addEventListener("click", () => {
    let cartmenu = document.querySelector(".carts");
    let extended = cartmenu.style.display === "block";
    cartmenu.style.display = extended ? "none" : "block";
});
document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".carts").style.display = "none";
});

let list = document.querySelector(".list");
let listCard = document.querySelector(".listcard");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let deliver = document.querySelector(".deliver");
let tax = document.querySelector(".tax");
let maxtotal = document.querySelector(".maxtotal");
let categoriesContainer = document.querySelector(".categories");
let searchInput = document.querySelector(".form-control");
let detailsSection = document.querySelector(".details");

var clickedCategoryName = '';
var fetchedData; // Store fetched data globally
var currentCategory; // Store the current category globally
let totalProductsCount = 0;
var listCards = [];

document.addEventListener('DOMContentLoaded', function () {
    fetchDataFromAPI('Laptop');

    searchInput.addEventListener('input', function (event) {
        searchProducts(event.target.value.trim().toLowerCase());
    });
});

function fetchDataFromAPI(categoryName) {
    var apiUrl = '/api/v1/products/allProducts';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            fetchedData = data;

            const uniqueCategories = [...new Set(data.map(product => product.category))];
            displayCategories(uniqueCategories);

            totalProductsCount = data.filter(product => product.category === categoryName).length;
            displayTotalProductsCount(totalProductsCount);

            currentCategory = categoryName;

            let categoryContainer = document.createElement("div");
            categoryContainer.classList.add("category-container");

            data.forEach(product => {
                if (product.category === categoryName) {

                    let newDiv = document.createElement("div");
                    newDiv.classList.add("item");
                    newDiv.innerHTML = `
                        <div class="card">
                            <div class="card-title d-flex">
                                <div class="btn btn-pri percent">${product.quantity}</div>
                                <div class="btn btn-pri love"><i class="fa-regular fa-heart" style="color: #58A0E2;"></i></div>
                            </div>
                            <img src="${product.image}" alt="product" width="100px">

                            <div class="card-title d-flex">
                                <div class="btn btn-sm btn-pri cartgo">${product.category}</div>
                                <h5 class="original">$${parseFloat(product.price).toLocaleString()}</h5>
                            </div>

                            <p class="card-text">${product.name}</p>

                            <button class="CartBtn addCart" data-key="${product._id}">
                                <span class="IconContainer"> 
                                    <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                                </span>
                                <span class="text">Add to Cart</span>
                            </button>
                        </div>
                    `;
                    newDiv.addEventListener('click', function () {
                        showProductDetails(product);
                    });
                    categoryContainer.appendChild(newDiv);
                }
            });

            list.appendChild(categoryContainer);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayCategories(categories) {
    categoriesContainer.innerHTML = '';

    categories.forEach(category => {
        let categoryDiv = document.createElement("div");
        categoryDiv.classList.add("eachCategory", "tooltip-container");
        categoryDiv.innerHTML = `
            <div class="text">${category}</div>
            <div class="tooltip">
                <img src="images/${category.toLowerCase()}.png" alt="Tooltip Image">
            </div>
        `;
        categoryDiv.addEventListener('click', function () {
            clickedCategoryName = category;
            console.log('Clicked category:', clickedCategoryName);

            document.querySelector(".list").innerHTML = ``;
            fetchDataFromAPI(clickedCategoryName);
        });

        categoriesContainer.appendChild(categoryDiv);
    });
}

function displayTotalProductsCount(count) {
    document.getElementById('totalProductsCount').innerText = count;
}

function addToCart(event, key) {
    event.preventDefault();
    const productToAdd = JSON.parse(JSON.stringify(fetchedData.find(product => product._id === key)));

    const uniqueIdentifier = `${productToAdd._id}_${currentCategory}`;
    const existingProductIndex = listCards.findIndex(product => product.uniqueIdentifier === uniqueIdentifier);

    if (existingProductIndex === -1) {
        listCards.push({ ...productToAdd, quantity: 1, uniqueIdentifier });
    } else {
        listCards[existingProductIndex].quantity++;
    }

    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = ``;
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, index) => {
        totalPrice += parseFloat(value.price) * value.quantity;
        count += value.quantity;

        const product = fetchedData.find(item => item._id === value._id);

        if (product) {
            let cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("cart-item-container");

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="${product.image}" alt="" width=""></div>
                <div>${product.name}</div>
                <div class="nss">
                    <div>$${(parseFloat(product.price) * value.quantity).toLocaleString()}</div>
                    <div>
                        <button onclick="changeQuantity(${index}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${index}, ${value.quantity + 1})">+</button>
                    </div>
                </div>
            `;
            cartItemContainer.appendChild(newDiv);

            listCard.appendChild(cartItemContainer);
        } else {
            console.error('Product not found:', value);
        }
    });

    let del = totalPrice * 0.02;
    let ttax = totalPrice * 0.011;
    let max = totalPrice + del + ttax;

    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
    deliver.innerText = del.toLocaleString();
    tax.innerText = ttax.toLocaleString();
    maxtotal.innerText = max.toLocaleString();
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        listCards.splice(key, 1);
    } else {
        listCards[key].quantity = quantity;
    }
    reloadCard();
}

function showProductDetails(product) {
    detailsSection.innerHTML = `
        <div class="head">
            <div class="name">${product.name}</div>
            <div class="close">X</div>
        </div>
        <div class="row">
            <div class="img col-6">
                <img src="${product.image}" alt="Product Image">
            </div>
            <div class="detailText col-6">
                <div class="d-flex justify-content-between">
                    <div class="cartgo">${product.category}</div>
                    <h5 class="original">$${parseFloat(product.price).toLocaleString()}</h5>
                    <div class="percent">${product.quantity}</div>
                </div>
                <div class="description">${product.description}</div>
            </div>
        </div>
        <button class="CartBtn addCart" data-key="${product._id}">
            <span class="IconContainer"> 
                <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
            </span>
            <span class="text">Add to Cart</span>
        </button>
    `;
    detailsSection.style.display = "block";

    detailsSection.querySelector(".close").addEventListener("click", () => {
        detailsSection.style.display = "none";
    });

    detailsSection.querySelector(".addCart").addEventListener("click", (event) => {
        addToCart(event, product._id);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const productListContainer = document.querySelector('.list');
    const searchInput = document.querySelector('.form-control');

    productListContainer.addEventListener('click', function (event) {
        const addButton = event.target.closest('.addCart');
        if (addButton) {
            const key = addButton.dataset.key;
            addToCart(event, key);
        }
    });

    searchInput.addEventListener('input', function(event) {
        const query = event.target.value.toLowerCase();
        searchProducts(query);
    });

    fetchDataFromAPI('Laptop');
});

function searchProducts(query) {
    const filteredProducts = fetchedData.filter(product => {
        return product.name.toLowerCase().includes(query);
    });

    list.innerHTML = '';

    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    filteredProducts.forEach(product => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
            <div class="card">
                <div class="card-title d-flex">
                    <div class="btn btn-pri percent">${product.quantity}</div>
                    <div class="btn btn-pri love"><i class="fa-regular fa-heart" style="color: #58A0E2;"></i></div>
                </div>

                <img src=${product.image} alt="product" width="100px">

                <div class="card-title d-flex">
                    <div class="btn btn-sm btn-pri cartgo">${product.category}</div>
                    <h5 class="original">$${parseFloat(product.price).toLocaleString()}</h5>
                </div>

                <p class="card-text">${product.name}</p>

                <button class="CartBtn addCart" data-key="${product._id}">
                    <span class="IconContainer"> 
                        <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                    </span>
                    <span class="text">Add to Cart</span>
                </button>
            </div>
        `;
        newDiv.addEventListener('click', function () {
            showProductDetails(product);
        });
        categoryContainer.appendChild(newDiv);
    });

    list.appendChild(categoryContainer);
}