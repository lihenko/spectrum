//main.js file

jQuery('.home-slider').slick({
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 1,
  arrows: true,
  dots: false,
  infinite: true,
  speed: 800,
  autoplaySpeed: 4000,
  fade: true, // добре для паралаксу
  cssEase: 'linear',
  prevArrow: jQuery('.home-slider-prev'),
  nextArrow: jQuery('.home-slider-next'),
});

jQuery('.line-wrap').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1,
    variableWidth: true,
    speed: 10000,
    dots: false,
    arrows: false,
    cssEase: 'linear',
    waitForAnimate: false,
    pauseOnFocus: false, 
    pauseOnHover: false
  });


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

  let scrolledOnce = false; // прапорець, щоб не повторювати автопрокрутку

  // IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !scrolledOnce) {
        slider.slick('slickNext');
        scrolledOnce = true; // тільки один раз
      }
    });
  }, { threshold: 0.5 }); // коли видно мінімум 50% слайдера

  const sliderEl = document.querySelector('.benefits-slider');
  if (sliderEl) {
    observer.observe(sliderEl);
  }
});

jQuery('.contact-slider').slick({
  autoplay: true,
  slidesToScroll: 1,
  slidesToShow: 3,
  arrows: true,
  dots: true,
  infinite: true,
  speed: 800,
  autoplaySpeed: 4000,
  prevArrow: jQuery('.contact-slider-prev'),
  nextArrow: jQuery('.contact-slider-next'),
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
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


document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-data').forEach((section) => {
    const more = section.querySelector('.service-more-description');
    const btn  = section.querySelector('.service-more-button a');
    const flexWrap = section.closest('.flex.flex-wrap'); // контейнер з items-end
    if (!more || !btn || !flexWrap) return;

    const OPEN_TEXT  = '+  mehr erfahren';
    const CLOSE_TEXT = '– weniger anzeigen';

    // Початкова підготовка
    more.classList.remove('hidden');
    more.style.overflow   = 'hidden';
    more.style.maxHeight  = '0px';
    more.style.transition = 'max-height 300ms ease';
    more.dataset.open = '0';

    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('role', 'button');

    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const isOpen = more.dataset.open === '1';

      if (isOpen) {
        // Закриваємо
        more.style.maxHeight = more.scrollHeight + 'px';
        requestAnimationFrame(() => {
          more.style.maxHeight = '0px';
        });
        more.dataset.open = '0';
        btn.textContent = OPEN_TEXT;
        btn.setAttribute('aria-expanded', 'false');

        // Додаємо items-end після завершення анімації
        const onClose = (ev) => {
          if (ev.propertyName === 'max-height' && more.dataset.open === '0') {
            //flexWrap.classList.add('items-end');
            more.removeEventListener('transitionend', onClose);
          }
        };
        more.addEventListener('transitionend', onClose);

      } else {
        // Відкриваємо
        more.style.maxHeight = more.scrollHeight + 'px';
        more.dataset.open = '1';
        btn.textContent = CLOSE_TEXT;
        btn.setAttribute('aria-expanded', 'true');

        // Одразу прибираємо items-end
        //flexWrap.classList.remove('items-end');

        const onOpen = (ev) => {
          if (ev.propertyName === 'max-height' && more.dataset.open === '1') {
            more.style.maxHeight = '';
            more.removeEventListener('transitionend', onOpen);
          }
        };
        more.addEventListener('transitionend', onOpen);
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const moreBox = document.querySelector('.bio-more-info');
  const btn     = document.querySelector('.bio-more-button');

  if (!moreBox || !btn) return;

  const OPEN_TEXT  = '+  mehr erfahren';
  const CLOSE_TEXT = '– weniger anzeigen';

  // Підготовка для плавного відкривання
  moreBox.classList.remove('hidden');
  moreBox.style.overflow   = 'hidden';
  moreBox.style.maxHeight  = '0px';
  moreBox.style.transition = 'max-height 300ms ease';
  moreBox.dataset.open = '0';

  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('role', 'button');

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = moreBox.dataset.open === '1';

    if (isOpen) {
      // Закриваємо
      moreBox.style.maxHeight = moreBox.scrollHeight + 'px';
      requestAnimationFrame(() => {
        moreBox.style.maxHeight = '0px';
      });
      moreBox.dataset.open = '0';
      btn.textContent = OPEN_TEXT;
      btn.setAttribute('aria-expanded', 'false');
    } else {
      // Відкриваємо
      moreBox.style.maxHeight = moreBox.scrollHeight + 'px';
      moreBox.dataset.open = '1';
      btn.textContent = CLOSE_TEXT;
      btn.setAttribute('aria-expanded', 'true');

      const onEnd = (ev) => {
        if (ev.propertyName === 'max-height' && moreBox.dataset.open === '1') {
          moreBox.style.maxHeight = '';
          moreBox.removeEventListener('transitionend', onEnd);
        }
      };
      moreBox.addEventListener('transitionend', onEnd);
    }
  });
});




document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    function toggleItem() {
      // Закриваємо всі інші
      items.forEach(i => {
        const ans = i.querySelector(".faq-answer");
        if (i !== item) {
          i.classList.remove("open");
          ans.style.maxHeight = null;
          ans.style.opacity = 0;
        }
      });

      // Перемикаємо поточний
      if (item.classList.contains("open")) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
        answer.style.opacity = 0;
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.opacity = 1;
      }
    }

    // Відкривати і по кліку, і по наведенню
    question.addEventListener("click", toggleItem);
    question.addEventListener("mouseover", toggleItem);
    item.addEventListener("mouseleave", toggleItem);
  });
});


document.addEventListener("scroll", function () {
  const header = document.getElementById("fixed-header");
  if (!header) return; // якщо елементу немає

  if (window.scrollY > 300) {
    header.classList.add("fixed");
  } else {
    header.classList.remove("fixed");
  }
});


AOS.init({
  duration: 1000, // тривалість анімації
  once: true,
  
});