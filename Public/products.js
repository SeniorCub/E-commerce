document.querySelector(".carts").style.display = "none";

document.querySelector(".car").addEventListener("click", () => {
    let cartmenu = document.querySelector(".carts");
    let extended = cartmenu.style.display === "block";
    cartmenu.style.display = extended ? "none" : "block";
});

let list = document.querySelector(".list");
let listCard = document.querySelector(".listcard");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let deliver = document.querySelector(".deliver");
let tax = document.querySelector(".tax");
let maxtotal = document.querySelector(".maxtotal");

// Declare a global variable to store the clicked category name
var clickedCategoryName = '';
var fetchedData; // Store fetched data globally
var currentCategory; // Store the current category globally
let totalProductsCount = 0;
// Change listCards to an array
var listCards = [];

document.addEventListener('DOMContentLoaded', function () {
    // Get the container that holds the product list
    const productListContainer = document.querySelector('.list');

    // Delegate the click event to the product list container
    productListContainer.addEventListener('click', function (event) {
        const addButton = event.target.closest('.addCart');
        if (addButton) {
            // Find the index of the product in the list
            const key = addButton.dataset.key;
            addToCart(event, key);
        }
    });

    // Get all elements with the class 'eachCategory'
    var categoryElements = document.querySelectorAll('.eachCategory');

    // Iterate through each element and add a click event listener
    categoryElements.forEach(function (element) {
        element.addEventListener('click', function () {
            // Get the inner text of the clicked category
            clickedCategoryName = element.querySelector('.text').innerText;
            console.log('Clicked category:', clickedCategoryName);

            document.querySelector(".list").innerHTML = ``;
            // Now you can use 'clickedCategoryName' to fetch data from an API or perform other actions.
            fetchDataFromAPI(clickedCategoryName);
        });
    });

    // Fetch initial data for a default category (if needed)
    fetchDataFromAPI('Tv');
});

function fetchDataFromAPI(categoryName) {
    // Replace this URL with the actual path to your external JSON file
    var apiUrl = 'products.json';

    // Store the current category globally
    currentCategory = categoryName;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            fetchedData = data; // Store fetched data globally
            // Check if the category exists in the JSON data
            if (categoryName in fetchedData) {
                var categoryData = fetchedData[categoryName];

               // Update the totalProductsCount variable
               totalProductsCount = categoryData.length;

                // Create a container div for the products
                let categoryContainer = document.createElement("div");
                categoryContainer.classList.add("category-container");

                categoryData.forEach((value, key) => {
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
            } else {
                console.error('Category not found:', categoryName);
            }
            // Display the total number of products on the webpage
            displayTotalProductsCount(totalProductsCount);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

        function displayTotalProductsCount(count) {
          // Display the count on the webpage (update the element ID accordingly)
          document.getElementById('totalProductsCount').innerText = count;
      }
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
                <div>$${(product.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${index}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${index}, ${value.quantity + 1})">+</button>
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