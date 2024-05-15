import { supabase, Toastify} from "../main";
// !! functionality for notification
/// Success Notification
function successNotification(message) {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    style: {
      background:
        "linear-gradient(90deg, rgba(0,150,199,1) 25%, rgba(44,168,209,1) 60%, rgba(82,184,217,1) 90%)",
    },
  }).showToast();
}

// Error Notification
function errorNotification(message) {
  Toastify({
    text: message,
    duration: 10000,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    style: {
      background:
        "linear-gradient(90deg, rgba(187,10,26,1) 15%, rgba(226,37,54,1) 65%, rgba(255,64,81,1) 90%)",
    },
  }).showToast();
}
// !! end of functionality

const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  //!! Disable the submit button
  document.querySelector("#form_register button").disabled = true;
  document.querySelector("#form_register button").innerHTML =
    `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span>Loading...</span>`;

  // !! get value from form
  const formData = new FormData(form_register);

  //!! input from the form
  if (formData.get("password") == formData.get("password_confirmation")) {
    //!! do action below if true
    // !! create user , and check if not null then add data, not null show notifications, reset button and refresh
    //!! create user
    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    let user_id = data.user.id;

    // !! check user if registered already
    if (user_id != null) {
      const { data, error } = await supabase
        .from("user_info")
        .insert([
          {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            contact_num: formData.get("contact_num"),
            address: formData.get("address"),
            user_id: user_id,
            role: "customer",
          },
        ])
        .select();

      // !! notification
      if (error == null) {
        successNotification("Sign up successful!", 10);
      } else {
        errorNotification("Something went wrong, please try again later.", 10);
        console.log(error);
      }
    }
  } else {
    errorNotification("Password does not match. Please try again.", 10);
  }

  //!! Reset Form
  form_register.reset();

  //! Enable Submit Button
  document.querySelector("#form_register button").disabled = false;
  document.querySelector("#form_register button").innerHTML = `Sign Up`;
};
