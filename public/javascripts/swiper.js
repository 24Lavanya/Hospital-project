const swiper = new Swiper('.swiper', {
  slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 30,
     grabCursor: true,
     loop: true, // Enable continuous loop
     autoplay: {
       delay: 3000, // Autoplay interval in milliseconds
       disableOnInteraction: false, // Continue autoplay even when user interacts with the slider
     },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
});
