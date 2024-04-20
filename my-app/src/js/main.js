// Import jQuery
import $ from "jquery";
// Import our custom CSS

import "../scss/styles.scss";

// Import all of Bootstrap's JS
//import * as bootstrap from "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";

import fq_black from "../assets/icon/faq-fill-black.svg";
import fq_white from "../assets/icon/faq-fill-white.svg";
import searchIcon from "../assets/icon/search-fill.svg";

//!! import supabase

import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://niuvmcheeiwgcfqcltch.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdXZtY2hlZWl3Z2NmcWNsdGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyODUxMTksImV4cCI6MjAyNjg2MTExOX0.gqod-aFP7kmHFrYqZfYqHnddxklfH5Dd-wh-pBNIYYM"
);

// !! functionality for signup notification
// Success Notification
function successNotification(message, seconds = 0) {
  document.querySelector(".alert-success").classList.remove("d-none");
  document.querySelector(".alert-success").classList.add("d-block");
  document.querySelector(".alert-success").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-success").classList.remove("d-block");
      document.querySelector(".alert-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Error Notification
function errorNotification(message, seconds = 0) {
  document.querySelector(".alert-danger").classList.remove("d-none");
  document.querySelector(".alert-danger").classList.add("d-block");
  document.querySelector(".alert-danger").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".alert-danger").classList.remove("d-block");
      document.querySelector(".alert-danger").classList.add("d-none");
    }, seconds * 1000);
  }
}

// !! end of functionality signup

export { supabase, successNotification, errorNotification };

//Search modal
// var modal = document.getElementById("searchModal");
// var input = document.getElementById("searchInput");
// modal.addEventListener("shown.bs.modal", function () {
//   input.focus();
// });

// Search functionality
var words = ["Butuan", "Surigao", "Cabadbaran"];
var modalIds = {
  Butuan: "butuanModal",
  Surigao: "surigaoModal",
  Cabadbaran: "cabadbaranModal",
};

// $(document).ready(function () {
//   $("#searchInput").on("input", function () {
//     var input = $(this).val().toLowerCase();
//     var matches = words.filter((word) => word.toLowerCase().startsWith(input));
//     if (matches.length > 0) {
//       var html = matches
//         .map(
//           (word) => `
//           <div class="search_item col-md-4 pb-2">
//           <div
//             class="d-flex align-items-center"
//             data-bs-toggle="modal"
//             data-bs-target="#${modalIds[word]}"
//           >
//             <img src="${searchIcon}" alt="${word}" />
//             <h5 class="ps-1 mt-1">${word}</h5>
//           </div>
//         </div>
//       `
//         )
//         .join("");
//       $("#searchResults").html(
//         '<div class="container"><div class="row">' + html + "</div></div>"
//       );
//       var searchModal = new bootstrap.Modal(
//         document.getElementById("searchModal")
//       );
//       searchModal.show(); // Show the modal if there are matches
//     } else {
//       var searchModal = bootstrap.Modal.getInstance(
//         document.getElementById("searchModal")
//       );
//       if (searchModal) {
//         searchModal.hide(); // Hide the modal if there are no matches
//       }
//     }
//   });

//   $(document).on("click", ".search_item", function () {
//     var searchModal = bootstrap.Modal.getInstance(
//       document.getElementById("searchModal")
//     );
//     if (searchModal) {
//       searchModal.hide();
//     }
//   });

//   $(".modal").on("hidden.bs.modal", function () {
//     if ($(".modal.show").length > 0) {
//       $("body").addClass("modal-open");
//     } else {
//       $("body").removeClass("modal-open");
//       $("body").css("overflow", "auto");
//     }
//   });
// });

// Top-bar change on scroll
var topBar = document.querySelector(".top-bar");
var searchBox = document.querySelector(".search_box");
var introLogo = document.querySelector(".intro-logo");
// var introLogoPosition = introLogo.getBoundingClientRect().top + window.scrollY;

window.addEventListener("scroll", function () {
  var scrollPosition = window.scrollY;
  var faqImage = document.querySelector(".faq img"); // select the img element

  if (scrollPosition > introLogoPosition) {
    topBar.classList.add("white-background");
    searchBox.classList.add("s_active");
    faqImage.src = fq_black;
  } else {
    topBar.classList.remove("white-background");
    searchBox.classList.remove("s_active");
    faqImage.src = fq_white;
  }
});
