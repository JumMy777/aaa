// Import jQuery
import $ from "jquery";
// Import our custom CSS

import "../scss/styles.scss";

// Import all of Bootstrap's JS
//import * as bootstrap from "bootstrap";
import "bootstrap/dist/js/bootstrap.bundle";

//!! import router

import {setRouter} from "./router/router.js";

import fq_black from "../assets/icon/faq-fill-black.svg";
import fq_white from "../assets/icon/faq-fill-white.svg";
import searchIcon from "../assets/icon/search-fill.svg";

//!! import supabase

import { createClient } from "@supabase/supabase-js";

// !! set router
setRouter();

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "https://alzkjjjbtyariubvcwcn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsemtqampidHlhcml1YnZjd2NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM5MzY4MDcsImV4cCI6MjAyOTUxMjgwN30.b7nqneAN1DXhQjilH1Xs5IhAZeVN1CjtYwfRzxZ87h8"
);

export { supabase };




// Search functionality
var words = ["Butuan", "Surigao", "Cabadbaran"];
var modalIds = {
  Butuan: "butuanModal",
  Surigao: "surigaoModal",
  Cabadbaran: "cabadbaranModal",
};

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
