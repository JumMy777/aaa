function setRouter() {
  switch (window.location.pathname) {
    //! restrict and redirect if logged in using case
    case "/":
      if (localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;

    // !! redirect if not logged in using case
    case "/admin.html":
    case "/admin_hotel.html":
      // Add more pages to add restrictions

      if (!localStorage.getItem("access_token")) {
        window.location.pathname = "/index.html";
      }
      break;

    // !! redirect if not admin
    case "/index.html": // Change this to a page where Admin has access; Add more case if there are more pages
      if (!localStorage.getItem("role") || localStorage.getItem("role") !== "admin") {
        window.location.pathname = "/admin.html";
      }
      break;

      // !! redirect if not admin
    case "/index.html": // Change this to a page where Admin has access; Add more case if there are more pages
    if (!localStorage.getItem("role") || localStorage.getItem("role") !== "customer") {
      window.location.pathname = "/index.html";
    }
    break;


    default:
      break;
  }
}

export { setRouter };
