console.log("kgdfgf");
const hamburgerButton = document.querySelector('.hamburger-button')
const navbarLinks = document.querySelector('.nav-links')
//what happens when you click on the hamburger menu (mobile view)
hamburgerButton.addEventListener('click' , function (e) {
    navbarLinks.classList.toggle('active')
})



let slides = document.querySelectorAll('.slide')
let nextBtn = document.querySelector('.next-btn')
let prevBtn = document.querySelector('.previous-btn')
let autoScroll = true
let intervalTime = 5000;
let slideInterval;

let nextSlide = function(){
    // get current class
    const current = document.querySelector('.current')
    // remove current class
    current.classList.remove("current")
    //checking for next slide
    if(current.nextElementSibling) {
    //add current to next sibling 
        current.nextElementSibling.classList.add('current')
    } else {
    // add current to start  
        slides[0].classList.add("current")
    }
    setTimeout( function() {
        current.classList.remove('current')
    })
}

let previousSlide = function(){
    // get current class
    const current = document.querySelector('.current')
    // remove current class
    current.classList.remove('current')
    //checking for previous slide
    if(current.previousElementSibling) {
    //add current to previous sibling 
        current.previousElementSibling.classList.add('current')
    } else {
    // add current to last  
        slides[slides.length-1].classList.add('current')
    }
    setTimeout( function() {
        current.classList.remove('current')
    })
}

nextBtn.addEventListener('click', function(){
    nextSlide()
    if(autoScroll) {
        clearInterval(slideInterval)
        slideInterval = setInterval(nextSlide, intervalTime);

    }
})
prevBtn.addEventListener('click', function(){
    previousSlide()
    if(autoScroll) {
        clearInterval(slideInterval)
        slideInterval = setInterval(nextSlide, intervalTime);

    }
})

// auto slide
if(autoScroll) {
    slideInterval = setInterval(nextSlide, intervalTime);

}