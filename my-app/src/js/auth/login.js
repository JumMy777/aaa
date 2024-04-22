import { supabase, successNotification, errorNotification } from "../main";

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
  } else {
    errorNotification("Something went wrong, please try again later.", 10);
    console.log(error);
  }

  //!! Reset Form
  form_login.reset();

  //!! Enable Submit Button
  document.querySelector("#form_login button").disabled = false;
  document.querySelector("#form_login button").innerHTML = `Log in`;
  window.location.pathname = "/index.html";
};
