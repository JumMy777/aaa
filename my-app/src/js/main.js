// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Button to show more or less text
document.addEventListener("DOMContentLoaded", function () {
  var showMoreBtn = document.querySelector(".btn-outline-primary.show-more");
  var showLessBtn = document.querySelector(".btn-outline-primary.show-less");

  showMoreBtn.addEventListener("click", function () {
    showMoreBtn.classList.add("d-none");
    showLessBtn.classList.remove("d-none");
  });

  showLessBtn.addEventListener("click", function () {
    showLessBtn.classList.add("d-none");
    showMoreBtn.classList.remove("d-none");
  });
});

// Top-bar change on scroll
var topBar = document.querySelector(".top-bar");
var searchBox = document.querySelector(".search_box");
var introLogo = document.querySelector(".intro-logo");
var faqImage = document.querySelector(".faq img");
var introLogoPosition = introLogo.getBoundingClientRect().top + window.scrollY;

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;

  if (scrollPosition > introLogoPosition) {
    topBar.classList.add("white-background");
    searchBox.classList.add("s_active");
    faqImage.src = "/assets/icon/faq-fill-black.svg";
  } else {
    topBar.classList.remove("white-background");
    searchBox.classList.remove("s_active");
    faqImage.src = "/assets/icon/faq-fill-white.svg";
  }
});
