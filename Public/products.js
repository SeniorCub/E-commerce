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

let listCards = [];

function initApp() {
     fetch('products.json')
  .then(response => response.json())
  .then(data => {
    data.tv.forEach((value, key) => { // Change from data.tvs to data.tv
      // Add a quantity property to each product
      value.quantity = 0;

      let newDiv = document.createElement("div");
      newDiv.classList.add("item");
      const heartIconStyle = value.liked ? "fa-solid" : "fa-regular";
      newDiv.innerHTML = `
        <div class="card" style="width: 20rem; height: 30rem;">
             <div class="bon card-title d-flex">
                  <div class="btn btn-pri percent">${value.rating.rate}</div>
                  <div class="btn btn-pri love"><i class="fa-regular fa-heart" style="color: #58A0E2;"></i></div>
             </div>

             <img src= ${value.image} alt="product" width="100px">

             <div class="card-title  d-flex">
                  <div class="btn btn-sm btn-pri cartgo">${value.category}</div>
                  <h5 class="original">$${value.price.toLocaleString()}</h5>
             </div>
             
             <p class="card-text">${value.name}</p>

             <button class="CartBtn addCart" onclick="addToCart(event, ${key})">
                  <span class="IconContainer"> 
                  <i  class="fa-solid fa-cart-shopping" class="cart" style="color: #ffffff;"></i>
                  </span>
                  <span class="text">Add to Cart</span>
             </button>
        </div>
      `;
      list.appendChild(newDiv);
    });
  })
  .catch(error => console.error('Error fetching data:', error));
}

function addToCart(event, key) {
    event.preventDefault();
    if (listCards[key] == null) {
        listCards[key] = { ...products[key], quantity: 1 };
    }
    // Increment the quantity when adding to cart
    products[key].quantity++;
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
            listCard.appendChild(newDiv);
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
    reloadCard();ggs
}

let toogler = document.querySelectorAll(".love");
toogler.forEach((button, key) => {
    button.addEventListener("click", (event) => like(event, key));
});

function like(event, key) {
    const likeButton = event.currentTarget;
    const product = products[key];

    const heartIcon = likeButton.querySelector(".fa-heart");

    // Toggle the liked property for the specific product
    product.liked = !product.liked;

    // Toggle the heart icon based on the liked property
    heartIcon.classList.toggle("fa-solid", product.liked);
    heartIcon.classList.toggle("fa-regular", !product.liked);
}

initApp();