console.log("kgdfgf");
const hamburgerButton = document.querySelector('.hamburger-button')
const navbarLinks = document.querySelector('.nav-links')
//what happens when you click on the hamburger menu (mobile view)
hamburgerButton.addEventListener('click' , function (e) {
    navbarLinks.classList.toggle('active')
})



