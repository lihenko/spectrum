//main.js file


jQuery(document).ready(function () {
  const slider = jQuery('.benefits-slider');

  // ініціалізація slick
  slider.slick({
    autoplay: false,
  slidesToScroll: 1,
  slidesToShow: 9,
  arrows: true,
  dots: false,
  infinite: true,
  speed: 800,
  prevArrow: jQuery('.benefits-slider-prev'),
  nextArrow: jQuery('.benefits-slider-next'),
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 510,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 410,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
});


// Scroll to top
let mybutton = document.getElementById("btn-back-to-top");


window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 50 ||
    document.documentElement.scrollTop > 50
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

mybutton.addEventListener("click", backToTop);


function backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

jQuery(document).on('click', 'a[href^="#"]', function (event) {
  if (jQuery(this).attr('href') == '#') {
    return;
  } else {
    event.preventDefault();
    jQuery('html, body').animate({
        scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top
    }, 500);
  }
  
});




AOS.init({
  duration: 1000, // тривалість анімації
  once: true,
  
});