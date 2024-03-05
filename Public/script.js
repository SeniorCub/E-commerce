let products = [
     {
     id:1,
     name:"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
     price:109.95,
     category:"men clothing",
     image:"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
     rating:{"rate":3.9,"count":120}
},{
     id:2,
     name:"Mens Casual Premium Slim Fit T-Shirts ",
     price:22.3,
     category:"men's clothing",
     image:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
     rating:{"rate":4.1,"count":259}
}
,{
     
     id:3,
     name:"Mens Cotton Jacket",
     price:55.99,
     category:"men's clothing",
     image:"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
     rating:{"rate":4.7,"count":500}
},{
     id:5,
     name:"John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
     price:695,
     category:"jewelery",
     image:"https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
     rating:{"rate":4.6,"count":400}
},{
     id:6,
     name:"Solid Gold Petite Micropave ",
     price:168,
     category:"jewelery",
     image:"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
     rating:{"rate":3.9,"count":70}
},{
     id:7,
     name:"White Gold Plated Princess",
     price:9.99,
     category:"jewelery",
     image:"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
     rating:{"rate":3,"count":400}
},{
     id:9,
     name:"WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
     price:64,
     category:"electronics",
     image:"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
     rating:{"rate":3.3,"count":203}
},{
     id:10,
     name:"SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
     price:109,
     category:"electronics",
     image:"https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
     rating:{"rate":2.9,"count":470}
},{
     id:11,
     name:"Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
     price:109,
     category:"electronics",
     image:"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
     rating:{"rate":4.8,"count":319}
},{
     id:12,
     name:"WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
     price:114,
     category:"electronics",
     image:"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
     rating:{"rate":4.8,"count":400}
},{
     id:13,
     name:"Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
     price:599,
     category:"electronics",
     image:"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
     rating:{"rate":2.9,"count":250}
},{
     id:14,
     name:"Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
     price:999.99,
     category:"electronics",
     image:"https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
     rating:{"rate":2.2,"count":140}
},{
     id:15,
     name:"BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
     price:56.99,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
     rating:{"rate":2.6,"count":235}
},{
     id:16,
     name:"Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
     price:29.95,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
     rating:{"rate":2.9,"count":340}
},{
     id:17,
     name:"Rain Jacket Women Windbreaker Striped Climbing Raincoats",
     price:39.99,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
     rating:{"rate":3.8,"count":679}
},{
     id:18,
     name:"MBJ Women's Solid Short Sleeve Boat Neck V ",
     price:9.85,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
     rating:{"rate":4.7,"count":130}
},{
     id:19,
     name:"Opna Women's Short Sleeve Moisture",
     price:7.95,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
     rating:{"rate":4.5,"count":146}
},{
     id:20,
     name:"DANVOUY Womens T Shirt Casual Cotton Short",
     price:12.99,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
     rating:{"rate":3.6,"count":145}
},{
     id:8,
     name:"Pierced Owl Rose Gold Plated Stainless Steel Double",
     price:10.99,
     category:"women's clothing",
     image:"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
     rating:{"rate":1.9,"count":100}
},{
     id:4,
     name:"Mens Casual Premium Slim Fit T-Shirts ",
     price:22.3,
     category:"men's clothing",
     image:"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
     rating:{"rate":4.1,"count":259}
}
];
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
    products.forEach((value, key) => {
        // Add a quantity property to each product
        value.quantity = 0;

        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        const heartIconStyle = value.liked ? "fa-solid" : "fa-regular";
        newDiv.innerHTML = `
            <img src="${value.image}" alt="product" width="100px">
            <div class="title">${value.name}</div>
            <div class="card-title  d-flex">
                <div class="btn btn-sm btn-pri cartgo">${value.category}</div>
            </div>
            <div class="bon card-title d-flex">
                <div class="btn btn-pri percent">${value.rating.rate}</div>
                <div class="btn btn-pri love""><i class="fa-regular fa-heart" style="color: #e94c2a;"></i></div>
            </div>
            <div class="price">$${value.price.toLocaleString()}</div>
            <button class="addCart" onclick="addToCart(event, ${key})">Add To Cart</button>
        `;
        list.appendChild(newDiv);
    });
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