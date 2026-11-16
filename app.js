console.log("app.js")
const products = [
  { id: 1, name: "Wireless Headphones", price: 50 },
  { id: 2, name: "Everyday Sneakers", price: 80 },
  { id: 3, name: "Classic Wristwatch", price: 120 },
  { id: 4, name: "Urban Backpack", price: 36 }
];


let cart = [];


const myCartCount = document.querySelector("#my-cart-count");
const cartCount = document.querySelector("#cartcount");
const cartItems = document.querySelector("#cartitems");
const subtotal = document.querySelector("#Subtotal");
const shoppingCart = document.querySelector("#shoppingcart");


function scrollToCart() {
  shoppingCart.scrollIntoView({ behavior: "smooth" });
}

function addtocart(id) {

  let found = false;

  for (let i = 0; i < cart.length; i++)  {

    if (cart[i].id === id) {
      cart[i].quantity++;
      found = true;
      break;
    }

  }

if ( found === false ) {
  const newItem = {
    id: id,
    quantity: 1
  };
  cart.push(newItem);
}
 updateCart();
}


function removeFromCart(id) {
  const newCart = [];
  for (let i = 0; i < cart.length; i++) {
        if (cart[i].id !== id) {
            newCart.push(cart[i]);
        }
    }
    cart = newCart;
    updateCart();
}


function clearcart() {
  cart = [];
  updateCart();
}


function showEmptyCart() {
  const emptyIcon = document.createElement("div");
  emptyIcon.className = "empty-cart";
  emptyIcon.textContent = "🛒";

  const emptyText = document.createElement("p");
  emptyText.textContent = "Your cart is empty. Add something you love!";

  cartItems.append(emptyIcon, emptyText);
}


function updateCart() {
  cartItems.textContent = ""; 

  let totalCount = 0;
  let totalPrice = 0;

  for (const item of cart) {
 
    const product = products.find((p) => p.id === item.id);
    const linePrice = product.price * item.quantity;

    totalCount += item.quantity;
    totalPrice += linePrice;

  
    const row = document.createElement("div");
    row.className = "cart-item";

    const name = document.createElement("span");
    name.textContent = `${product.name} × ${item.quantity}`;

    const price = document.createElement("span");
    price.textContent = `$${linePrice}`;

    const removeButton = document.createElement("button");
    removeButton.textContent = "✕";
    removeButton.addEventListener("click", () => {
      removeFromCart(item.id);
    });

    row.append(name, price, removeButton);
    cartItems.append(row);
  }

 
  if (cart.length === 0) {
    showEmptyCart();
  }


  myCartCount.textContent = totalCount;
  cartCount.textContent = totalCount;
  subtotal.textContent = `$${totalPrice}`;
}