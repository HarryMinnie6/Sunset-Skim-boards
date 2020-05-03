console.log("ggg");

let addBtn = document.querySelectorAll(".add-to-cart");

//looping over all the buttons
for( let i = 0; i< addBtn.length; i++) {
    addBtn[i].addEventListener('click', function(e){ 
        cartQuantity(inventory[i]) 
        cartTotal(inventory[i])    
    })   
}

//getting the number of items in the cart
function cartQuantity(product){   
    let productNumber = localStorage.getItem('cartQuantity')
    productNumber = parseInt(productNumber)
    if( productNumber) {
        localStorage.setItem('cartQuantity', productNumber + 1)
        document.querySelector('.cart-items').innerText =`${productNumber + 1}`
    } else{
        localStorage.setItem('cartQuantity', 1)
        document.querySelector('.cart-items').innerText = `: ${1}`
    }  
    setItems(product)
}

//adding the items to the cart (what they are)
function setItems(product){
    let cartItems = localStorage.getItem('itemsInCart')
    cartItems = JSON.parse(cartItems)
    if(cartItems != null) {

        if(cartItems[product.tag] === undefined){
            cartItems = {
                ...cartItems,
                [product.tag]:product
            }
        }
        cartItems[product.tag].inCart += 1
    } else { 
        product.inCart = 1
        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem('itemsInCart',JSON.stringify(cartItems))
}

//getting the total cost of everything in the cart
function cartTotal(product) {
    let cartCost = localStorage.getItem('cartTotal') 
    if(cartCost !=null) {
        cartCost = parseInt(cartCost)
        localStorage.setItem('cartTotal', cartCost + product.price )

    } else{
        localStorage.setItem('cartTotal', product.price)
     
    }

}
function displayCart(){
    let cartItems = localStorage.getItem('itemsInCart')
    cartItems = JSON.parse(cartItems)
    let cartDescription = document.querySelector(".cart-description")
    let cartTotal = document.querySelector(".cart-total")
    let cartCost = localStorage.getItem('cartTotal')

    if(cartItems && cartDescription){
        cartDescription.innerHTML=""
        Object.values(cartItems).map(function(item) {
            cartDescription.innerHTML += 
            `<div class="cart-item" ">
            <div class="cart-image-wrapper">
                <div class="cart-item-image"> ${item.image}</div>
            </div>
            <div class="cart-name-wrapper">
                <h3>Description</h3>
                <div class="cart-item-name"> ${item.name} - ${item.description}</div>
            </div>
            <div class="cart-qty-wrapper">
                <h3>Quantity</h3>
                <div class="qty-number-wrapper">
                    <div class="cart-item-price"><i class="fas fa-caret-left fa-2x" id="arrow-left"></i> ${item.inCart} <i class="fas fa-caret-right fa-2x" id="arrow-right"></i></div>
            </div>
                </div>
            <div class="cart-item-total-wrapper">
                <h3>Item total</h3>
                <div class="cart-item-total">R${item.price * item.inCart},00</div>
            </div>
                <button class="remove-from-cart-btn"> <i class="fas fa-trash"></i> </button>
            </div>`
          
            
            
        });

        cartTotal.innerHTML +=
        `<div class="total-cost-display">
        <h3 class="total-header">Cart Total</h3>
        <div class="total-number"> R${cartCost}.00
        </div>
        </div>`


    }
    
}
// when page is refreshed the number of items in the cart is displayed instead of an empty value
function onloadCart(){
    let productNumber = localStorage.getItem('cartNumbers')

    if(productNumber) {
        document.querySelector('.cart-items').innerText= ` ${productNumber}`
    }
}
onloadCart()
displayCart()

let searchBtn = document.querySelector('.search-btn')

//event listener for the search bar
let searchBar = document.querySelector('#searchbar')
searchBar.addEventListener('keyup', filter)

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


//searchbar
function filter(e){
    
    let shopFilter = inventory.filter((inventory) => {
        console.log(e.target.value);
        
       return inventory.name.includes(e.target.value.toLowerCase()) || 
              inventory.description.includes(e.target.value.toLowerCase()) ||
              inventory.tag.includes(e.target.value.toLowerCase()) ||
              inventory.brand.includes(e.target.value.toLowerCase())     
    })      
    
    if(shopFilter){
        searchResultHolder.style.display = ""
        searchDisplayHolder.innerHTML=""
        Object.values(shopFilter).map(function(inventory) {
            boardWrapper.style.display = 'none'
            bagsWrapper.style.display = 'none'
            wetsuitsWrapper.style.display = 'none'
            accessoriesWrapper.style.display = 'none'
            aparrelWrapper.style.display = 'none'
            clearSearch.innerHTML = `<div> ${e.target.value} <button><i class="fas fa-times fa-2x"></i> </button></div>`
            searchDisplayHolder.innerHTML += 
            `<div class="item">
                <div class="item-name"> ${inventory.name} </div>
                <div> <img src="shop-images/boards/board-1.png"></div>
                <div class="item-description"> ${inventory.description}</div>
                <div class="item-price">${inventory.price}</div>
                <button class="add-cart-boards cart"> add to cart</button>
            </div>`   
        })
    } 
// showing matched search items
    if(searchDisplayHolder.children.length === 0) {
        boardWrapper.style.display = 'none'
            bagsWrapper.style.display = 'none'
            wetsuitsWrapper.style.display = 'none'
            accessoriesWrapper.style.display = 'none'
            aparrelWrapper.style.display = 'none'
        searchDisplayHolder.innerHTML += "<div> Sorry, No Items matched your search request</div>"  
        clearSearch.innerHTML = `<div> ${e.target.value} <button><i class="fas fa-times fa-2x"></i> </button></div>`  
    }  
// if the search bar is empty all shop items will be displayed
   if(e.target.value === "") {
    shopWrapper.style.display = ''
    boardWrapper.style.display = ''
    bagsWrapper.style.display = ''
    wetsuitsWrapper.style.display = ''
    accessoriesWrapper.style.display = ''
    aparrelWrapper.style.display = ''
    searchResultHolder.style.display = "none"
   }   
}




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

///////////////////////////////////////////////////////////////////////////////////////////////////
// --CURRENTLY USING 'DYNAMIC' SEARCH, ADD CODE UNDER FILTER TO ENABLE SEARCH WHEN THE SEARCH BUTTON IS CLICKED--//
// -- USING 'DYNAMIC' SEARCH AS THE INVENTORY IS SMALL ENOUGH--//

// let searchBtn = document.querySelector('.search-btn')
// searchBar.addEventListener('click', filter)

//goes in filter function//
// return inventory.name.includes(searchBar.value.toLowerCase()) || 
//               inventory.description.includes(searchBar.value.toLowerCase()) ||
//               inventory.tag.includes(searchBar.value.toLowerCase()) ||
//               inventory.brand.includes(searchBar.value.toLowerCase()) 

////////////////////////////////////////////////////////////////////////////////////////////////