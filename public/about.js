var slides = document.querySelector('.slides');
var slide = document.querySelectorAll('.slides li');
var currentIndex = 0;
var slideCount = slide.length;
var slideWidth = 200;
var slideMargin = 30;
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');



function makeClone() {
    for (var i = 0; i < slideCount; i++) {
        //a.cloneNode(), a.cloneNode(true) = clone a with its child
        var cloneSlide = slide[i].cloneNode(true)
        cloneSlide.classList.add("clone");
        slides.appendChild(cloneSlide)
        console.log(slides)
    };
};

makeClone();
