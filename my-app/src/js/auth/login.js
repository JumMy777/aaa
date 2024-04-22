import { supabase, successNotification, errorNotification } from "../main";

const form_login = document.getElementById("form_login");

form_login.onsubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // !! get value from form
  const formData = new FormData(form_login);

  let { data, error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (error == null) {
    successNotification("Log in successful!");
  } else {
    errorNotification("Something went wrong, please try again later.", 10);
    console.log(error); 
}
  


  console.log(data, error); 
};
