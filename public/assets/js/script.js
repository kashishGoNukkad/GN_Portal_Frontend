$(document).ready(function () {
    let owl = $(".owl-carousel").owlCarousel({
      loop: true,
      margin: 30,
      autoplay: false,
      nav: false,
      dots: true,
      slideTransition: "linear",
      autoplayTimeout: 3000,
      autoplaySpeed: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1,
          margin: 15,
        },
        600: {
          items: 2,
          margin: 15,
        },
        1000: {
          items: 3,
        },
      },
    });

    // Custom Navigation Events
    $("#next").click(function() {
      owl.trigger('next.owl.carousel')
    });
    $("#prev").click(function() {
      owl.trigger('prev.owl.carousel')
    });
  });