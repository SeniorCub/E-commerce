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
var listCards = [];
var fetchedData; // Store fetched data globally
var currentCategory; // Store the current category globally

document.addEventListener('DOMContentLoaded', function () {
    // Get all elements with the class 'eachCategory'
    var categoryElements = document.querySelectorAll('.eachCategory');

    // Iterate through each element and add a click event listener
    categoryElements.forEach(function (element) {
        element.addEventListener('click', function () {
            // Get the inner text of the clicked category
            clickedCategoryName = element.querySelector('.text').innerText;
            console.log('Clicked category:', clickedCategoryName);

            document.querySelector(".list").innerHTML=``;
            // Now you can use 'clickedCategoryName' to fetch data from an API or perform other actions.
            fetchDataFromAPI(clickedCategoryName);
        });
    });
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

                            <button class="CartBtn addCart" onclick="addToCart(event, ${key})">
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
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function addToCart(event, key) {
    event.preventDefault();
    if (listCards[key] == null) {
        listCards[key] = { ...fetchedData[currentCategory][key], quantity: 1 };
    } else {
        listCards[key].quantity++;
    }
    // Increment the quantity in the original data
    fetchedData[currentCategory][key].quantity++;
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = ``;
    let count = 0;
    let totalPrice = 0;

    // Calculate total based on listCards array
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price * value.quantity;
        count = count + value.quantity;

        if (value != null) {
            // Create a container div for each cart item
            let cartItemContainer = document.createElement("div");
            cartItemContainer.classList.add("cart-item-container");

            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
                <div><img src="${value.image}" alt="" width=""></div>
                <div>${value.name}</div>
                <div>$${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `;
            cartItemContainer.appendChild(newDiv);

            // Append the container with the cart item to the main listCard
            listCard.appendChild(cartItemContainer);
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
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    // Update the quantity in the original data
    fetchedData[currentCategory][key].quantity = quantity;
    reloadCard();
}