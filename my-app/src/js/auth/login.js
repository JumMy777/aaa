import { supabase } from "../main";

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

// !! end of functionality


const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  //!! Disable the submit button
  document.querySelector("#form_login button").disabled = true;
  document.querySelector("#form_login button").innerHTML =
    `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                      </div>
                      <span>Loading...</span>`;

  // !! get value from form
  const formData = new FormData(form_login);

  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  //   !! notifcation
  if (error == null) {
    successNotification("Log in successful!", 3);
    setTimeout(function() { //!! add timer
      window.location.pathname = "/index.html";
    }, 3000); // 3000 milliseconds = 3 seconds
  } else {
    errorNotification("Something went wrong, please try again later.", 10);
    console.log(error);
  }
  

  //!! Reset Form
  form_login.reset();

  //!! Enable Submit Button
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Log in`;
  
};
