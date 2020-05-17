// ----------------------------------------------------------------------------------
// functionality for the hamburger mennu
const hamburgerButton = document.querySelector('.hamburger-button')
const navbarLinks = document.querySelector('.nav-links')
//what happens when you click on the hamburger menu (mobile view)
hamburgerButton.addEventListener('click' , function (e) {
    navbarLinks.classList.toggle('active')
})
// ---------------------------------------------------------------------------------



let cart = (JSON.parse(localStorage.getItem('cart')) || []);
const cartDOM = document.querySelector('.cart');
const addToCartButtonsDOM = document.querySelectorAll('[data-action="ADD_TO_CART"]');

if (cart.length > 0) {
  cart.forEach(cartItem => {
    const product = cartItem;
    insertItemToDOM(product);
    countCartTotal()

    addToCartButtonsDOM.forEach(addToCartButtonDOM => {
      const productDOM = addToCartButtonDOM.parentNode;

      if (productDOM.querySelector('.product__name').innerText === product.name) {
        handleActionButtons(addToCartButtonDOM, product);
      }
    });

  });
}

addToCartButtonsDOM.forEach(addToCartButtonDOM => {
  addToCartButtonDOM.addEventListener('click', () => {
    const productDOM = addToCartButtonDOM.parentNode;
    const product = {
      image: productDOM.querySelector('.product__image').getAttribute('src'),
      name: productDOM.querySelector('.product__name').innerText,
      price: productDOM.querySelector('.product__price').innerText,
      quantity: 1,
    };

    const isInCart = (cart.filter(cartItem => (cartItem.name === product.name)).length > 0);

    if (!isInCart) {
      insertItemToDOM(product);
      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      countCartTotal()
      handleActionButtons(addToCartButtonDOM, product);
    }
  });
});

function insertItemToDOM(product) {
  cartDOM.insertAdjacentHTML('beforeend', `
    <div class="cart__item">
    <div class="image-wrapper ">
      <img class="cart__item__image" src="${product.image}" alt="${product.name}">
    </div>
      <h3 class="cart__item__name">${product.name}</h3>
      <h3 class="cart__item__price">${product.price}</h3>
      <div class='value-btns'> 
      <button class="decrease-btn" data-action="DECREASE_ITEM"><i class="fas fa-caret-left fa-2x"></i></button>
      <div class="quantity-wrapper">
      <h3 class="quantity-header">Quantity</h3>
      <h3 class="cart__item__quantity">${product.quantity}</h3>
      </div>
      <button class="increase-btn" data-action="INCREASE_ITEM"><i class="fas fa-caret-right fa-2x"></i></button>
      </div>
      <div class="item-total-wrapper">
      <h3 class="item-total-header">Item Total</h3>
      <h3 class="cart__item__total">${product.price * product.quantity}.00</h3>
      </div>
      
      <button class="delete-btn" data-action="REMOVE_ITEM"> X </button>
    </div>`
    );

    if (document.querySelector('.cart-footer') === null) {
      cartDOM.insertAdjacentHTML('afterend', `
        <div class="cart-footer">
          <button class="clear-cart-btn" data-action="CLEAR_CART">Clear Cart</button>
          <div class="cart-total" data-action="CHECKOUT-TOTAL"></div>
          <button class="payment-btn" data-action="CHECKOUT-BTN">Proceed to payment</button>
        </div>
      `);
  
      document.querySelector('[data-action="CLEAR_CART"]').addEventListener('click', () => clearCart());
      document.querySelector('[data-action="CHECKOUT-BTN"]').addEventListener('click', () => checkout());
    }
}

function handleActionButtons(addToCartButtonDOM, product) {
  addToCartButtonDOM.innerText = 'In Cart';
  addToCartButtonDOM.disabled = true;

  const cartItemsDOM = cartDOM.querySelectorAll('.cart__item');
  cartItemsDOM.forEach(cartItemDOM => {
    if (cartItemDOM.querySelector('.cart__item__name').innerText === product.name) {
      cartItemDOM.querySelector('[data-action="INCREASE_ITEM"]').addEventListener('click', () => increaseItem(product, cartItemDOM));
      cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').addEventListener('click', () => decreaseItem(product, cartItemDOM, addToCartButtonDOM));
      cartItemDOM.querySelector('[data-action="REMOVE_ITEM"]').addEventListener('click', () => removeItem(product, cartItemDOM, addToCartButtonDOM));
    }
  });
}

function increaseItem(product, cartItemDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      cartItemDOM.querySelector('.cart__item__quantity').innerText = ++cartItem.quantity;
      cartItemDOM.querySelector('.cart__item__total').innerText = cartItem.quantity * cartItem.price;
      // cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.remove('btn--danger');
      localStorage.setItem('cart', JSON.stringify(cart));
      countCartTotal()
    }
  });
}

function decreaseItem(product, cartItemDOM, addToCartButtonDOM) {
  cart.forEach(cartItem => {
    if (cartItem.name === product.name) {
      if (cartItem.quantity > 1) {
        cartItemDOM.querySelector('.cart__item__quantity').innerText = --cartItem.quantity;
        cartItemDOM.querySelector('.cart__item__total').innerText = cartItem.quantity * cartItem.price;
        localStorage.setItem('cart', JSON.stringify(cart));
        countCartTotal()
      } else {
        removeItem(product, cartItemDOM, addToCartButtonDOM);
      }

      if (cartItem.quantity === 1) {
        cartItemDOM.querySelector('[data-action="DECREASE_ITEM"]').classList.add('btn--danger');
      }
    }
  });
}

function removeItem(product, cartItemDOM, addToCartButtonDOM) {
  // cartItemDOM.classList.add('cart__item--removed');
  setTimeout(() => cartItemDOM.remove(), 250);
  cart = cart.filter(cartItem => cartItem.name !== product.name);
  localStorage.setItem('cart', JSON.stringify(cart));
  countCartTotal()
  addToCartButtonDOM.innerText = 'Add To Cart';
  addToCartButtonDOM.disabled = false;

  if (cart.length < 1) {
    document.querySelector('.cart-footer').remove();
  }
}

function addCartFooter() {

}

function clearCart() {
  cartDOM.querySelectorAll('.cart__item').forEach(cartItemDOM => {
    // cartItemDOM.classList.add('cart__item--removed');
    setTimeout(() => cartItemDOM.remove(), 250);
  });

  cart = [];
  localStorage.removeItem('cart');
  document.querySelector('.cart-footer').remove();

  addToCartButtonsDOM.forEach(addToCartButtonDOM => {
    addToCartButtonDOM.innerText = 'Add To Cart';
    addToCartButtonDOM.disabled = false;
  });
}

function checkout() {
alert("Payment method coming soon.")

}

function countCartTotal(){
  let cartTotal = 0
  cart.forEach(cartItem => {
    cartTotal += (cartItem.quantity * cartItem.price)

  })
  document.querySelector('[data-action="CHECKOUT-TOTAL"]').innerText = `Total: R${cartTotal}.00`
}

let cartDescription = document.querySelector('.cart-description')
let searchDisplayHolder = document.querySelector(".search-display-holder")
let boardWrapper = document.querySelector(".boards-wrapper")
let bagsWrapper = document.querySelector(".bags-wrapper")
let wetsuitsWrapper = document.querySelector(".wetsuit-wrapper")
let accessoriesWrapper = document.querySelector(".accessories-wrapper")
let aparrelWrapper = document.querySelector(".aparrel-wrapper")
let clearSearch = document.querySelector(".clear-search")
let searchResultHolder = document.querySelector('.search-result-holder')
let shopWrapper = document.querySelector(".shop-wrapper")


let shopDisplay = document.querySelector('.shop-display')
let sortBy = document.querySelector('.filter-shop')

//event listener for the sort by bar
sortBy.addEventListener('click', filterShop)

//function for what happens when you click on the sort by bar
function filterShop(e){
    let items = shopDisplay.childNodes
    items.forEach(function(){
        switch(e.target.value){
            case 'all':
            boardWrapper.style.display = 'grid'
            bagsWrapper.style.display = 'grid'
            wetsuitsWrapper.style.display = 'grid'
            accessoriesWrapper.style.display = 'grid'
            aparrelWrapper.style.display = 'grid'     
            break;
            case 'boards':
                boardWrapper.style.display = ''
                bagsWrapper.style.display = 'none'
                wetsuitsWrapper.style.display = 'none'
                accessoriesWrapper.style.display = 'none'
                aparrelWrapper.style.display = 'none'     
                break;
            case 'bags':
                boardWrapper.style.display = 'none'
                bagsWrapper.style.display = ''
                wetsuitsWrapper.style.display = 'none'
                accessoriesWrapper.style.display = 'none'
                aparrelWrapper.style.display = 'none'     
                break;   
            case 'wetsuits':
                boardWrapper.style.display = 'none'
                bagsWrapper.style.display = 'none'
                wetsuitsWrapper.style.display = ''
                accessoriesWrapper.style.display = 'none'
                aparrelWrapper.style.display = 'none'     
                break;   
            case 'accessories':
                boardWrapper.style.display = 'none'
                bagsWrapper.style.display = 'none'
                wetsuitsWrapper.style.display = 'none'
                accessoriesWrapper.style.display = ''
                aparrelWrapper.style.display = 'none'     
                break;   
            case 'aparrel':
                boardWrapper.style.display = 'none'
                bagsWrapper.style.display = 'none'
                wetsuitsWrapper.style.display = 'none'
                accessoriesWrapper.style.display = 'none'
                aparrelWrapper.style.display = ''     
                break;          
        }
    })
}


//displaying the cart
let cartBtn = document.querySelector('#shopping-cart')

cartBtn.addEventListener('click', function(){
  let cartDisplay = document.querySelector(".cart-display")
  if (cartDisplay.style.display === "none") {
    cartDisplay.style.display = 'block';
}
else {
  cartDisplay.style.display = "none";
}
  
})


// making cart display disappear when a location on the page is clicked

let navBar = document.querySelector('.navigation-bar')
let searchbarHolder = document.querySelector('.searchbar-holder')
shopDisplay.addEventListener('click', function(){
  let cartDisplay = document.querySelector(".cart-display")
  shopDisplay.style.display=''
  sortBy.style.display = ''
  cartDisplay.style.display = "none";
})

sortBy.addEventListener('click', function(){
  let cartDisplay = document.querySelector(".cart-display")
  shopDisplay.style.display=''
  sortBy.style.display = ''
  cartDisplay.style.display = "none";
})

navBar.addEventListener('click', function(){
  let cartDisplay = document.querySelector(".cart-display")
  shopDisplay.style.display=''
  sortBy.style.display = ''

  cartDisplay.style.display = "none";

  
})


