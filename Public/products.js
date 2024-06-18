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

// Declare a global variable to store the clicked category name
var clickedCategoryName = '';
var fetchedData; // Store fetched data globally
var currentCategory; // Store the current category globally
let totalProductsCount = 0;
// Change listCards to an array
var listCards = [];

document.addEventListener('DOMContentLoaded', function () {
    // Fetch initial data for a default category (if needed)
    fetchDataFromAPI('Tv');

    // Add event listener for search input
    searchInput.addEventListener('input', function (event) {
        searchProducts(event.target.value.trim().toLowerCase());
    });
});

function fetchDataFromAPI(categoryName) {
    // Replace this URL with the actual path to your external JSON file
    var apiUrl = 'products.json';

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            fetchedData = data; // Store fetched data globally

            // Get all unique category names
            const uniqueCategories = [...new Set(Object.keys(fetchedData))];
            // Display categories in the tooltip container
            displayCategories(uniqueCategories);

            // Display the total number of products on the webpage
            totalProductsCount = fetchedData[categoryName].length;
            displayTotalProductsCount(totalProductsCount);

            // Update the current category globally
            currentCategory = categoryName;

            // Create a container div for the products
            let categoryContainer = document.createElement("div");
            categoryContainer.classList.add("category-container");

            fetchedData[categoryName].forEach((value, key) => {
                // Add a quantity property to each product
                value.quantity = 0;

                let newDiv = document.createElement("div");
                newDiv.classList.add("item");
                newDiv.innerHTML = `
                    <div class="card">
                        <div class="card-title d-flex">
                            <div class="btn btn-pri percent">${value.rating.rate}</div>
                            <div class="btn btn-pri love"><i class="fa-regular fa-heart" style="color: #58A0E2;"></i></div>
                        </div>

                        <img src=${value.image} alt="product" width="100px">

                        <div class="card-title d-flex">
                            <div class="btn btn-sm btn-pri cartgo">${value.category}</div>
                            <h5 class="original">$${value.price.toLocaleString()}</h5>
                        </div>

                        <p class="card-text">${value.name}</p>

                        <button class="CartBtn addCart" data-key="${key}">
                            <span class="IconContainer"> 
                                <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                            </span>
                            <span class="text">Add to Cart</span>
                        </button>
                    </div>
                `;
                categoryContainer.appendChild(newDiv);
            });

            // Append the container with products to the main list
            list.appendChild(categoryContainer);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayCategories(categories) {
    // Clear existing categories
    categoriesContainer.innerHTML = '';

    // Append each category to the container
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
    // Display the count on the webpage (update the element ID accordingly)
    document.getElementById('totalProductsCount').innerText = count;
}

function addToCart(event, key) {
    event.preventDefault();
    const productToAdd = JSON.parse(JSON.stringify(fetchedData[currentCategory][key]));

    const uniqueIdentifier = `${productToAdd.productId}_${currentCategory}`;
    const existingProductIndex = listCards.findIndex(product => product.uniqueIdentifier === uniqueIdentifier);

    if (existingProductIndex === -1) {
        listCards.push({ ...productToAdd, quantity: 1, uniqueIdentifier });
    } else {
        listCards[existingProductIndex].quantity++;
    }

    fetchedData[currentCategory][key].quantity++;

    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = ``;
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, index) => {
        totalPrice += value.price * value.quantity;
        count += value.quantity;

        const [productId, category] = value.uniqueIdentifier.split('_');
        const product = fetchedData[category].find(item => item.productId === parseInt(productId));

        if (product) {
            // Create a container div for each cart item
            let cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("cart-item-container");

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="${product.image}" alt="" width=""></div>
                <div>${product.name}</div>
               <div class="nss">
                    <div>$${(product.price * value.quantity).toLocaleString()}</div>
                    <div>
                    <button onclick="changeQuantity(${index}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${index}, ${value.quantity + 1})">+</button>
                    </div>
               </div>
            `;
            cartItemContainer.appendChild(newDiv);

            // Append the container with the cart item to the main listCard
            listCard.appendChild(cartItemContainer);
        } else {
            console.error('Product not found:', value);
        }
    });

    // Calculate tax, delivery, and max total
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
    // Update the quantity in the original data
    fetchedData[currentCategory][key].quantity = quantity;
    reloadCard();
}
document.addEventListener('DOMContentLoaded', function () {
     // Get the container that holds the product list
     const productListContainer = document.querySelector('.list');
 
     // Get the search input element
     const searchInput = document.querySelector('.form-control');
 
     // Delegate the click event to the product list container
     productListContainer.addEventListener('click', function (event) {
         const addButton = event.target.closest('.addCart');
         if (addButton) {
             // Find the index of the product in the list
             const key = addButton.dataset.key;
             addToCart(event, key);
         }
     });
 
     // Add event listener to search input for keydown event
     searchInput.addEventListener('input', function(event) {
         const query = event.target.value.toLowerCase();
         searchProducts(query);
     });
 
     // Fetch initial data for a default category (if needed)
     fetchDataFromAPI('Tv');
 });
 
 function searchProducts(query) {
     const allProducts = Object.values(fetchedData).flat();
     const filteredProducts = allProducts.filter(product => {
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
                     <div class="btn btn-pri percent">${product.rating.rate}</div>
                     <div class="btn btn-pri love"><i class="fa-regular fa-heart" style="color: #58A0E2;"></i></div>
                 </div>
 
                 <img src=${product.image} alt="product" width="100px">
 
                 <div class="card-title d-flex">
                     <div class="btn btn-sm btn-pri cartgo">${product.category}</div>
                     <h5 class="original">$${product.price.toLocaleString()}</h5>
                 </div>
 
                 <p class="card-text">${product.name}</p>
 
                 <button class="CartBtn addCart" data-key="${product.key}">
                     <span class="IconContainer"> 
                         <i class="fa-solid fa-cart-shopping" style="color: #ffffff;"></i>
                     </span>
                     <span class="text">Add to Cart</span>
                 </button>
             </div>
         `;
         categoryContainer.appendChild(newDiv);
     });
 
     list.appendChild(categoryContainer);
 } 