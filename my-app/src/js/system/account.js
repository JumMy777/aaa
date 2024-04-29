import { supabase } from "../main";

// Load the user's information
getUserInfo();

// Get the user's information
async function getUserInfo() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If the user is logged in, get the user's information
  if (user != null) {
    let { data: user_info, error } = await supabase
      .from("user_info")
      .select("first_name, last_name, address, contact_num")
      .eq("user_id", user.id);
    console.log(user_info);

    // Display the user's name
    if (user_info && user_info.length > 0) {
      const { first_name, last_name } = user_info[0];
      document.getElementById("user-name").textContent =
        `${first_name} ${last_name}`;
    }

    // Remove data-bs-toggle and data-bs-target attributes and set id attribute to "btn_logout"
    const removeModalElement = document.querySelector(".remove_modal");
    removeModalElement.removeAttribute("data-bs-toggle");
    removeModalElement.removeAttribute("data-bs-target");
    removeModalElement.setAttribute("id", "btn_logout");

    // Hide element with class "btn_hide" and show element with class "btn_show"
    document.querySelector(".btn_hide").classList.add("d-none");
    document.querySelector(".btn_show").classList.remove("d-none");
  }
}

// !! functionality for notification
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

// Get reference to the logout button
const btnLogout = document.querySelector(".btn_show");

// Function to handle logout
btnLogout.onclick = async () => {
  let { error } = await supabase.auth.signOut();

  if (error == null) {
    successNotification("Log out sucessful!", 3);
    // Clear local storage
    localStorage.clear();
    // Redirect to index.html
    window.location.pathname = "/";
  } else {
    errorNotification("Logout failed!", 3);
  }
};
