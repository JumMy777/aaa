import { supabase } from "../main";


const form_register = document.getElementById("form_register");

form_register.onsubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  // console.log("Form submitted"); test

  // !! get value from form sign up
  const formData = new FormData(form_register);

  //!! input from the form
  if (formData.get("password") == formData.get("password_confirmation")) {
    //?? move this later
    //!! alert("Sign up successful");

    //!! create user
    const { data, error } = await supabase.auth.signUp({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    let user_id = data.user.id;

    // !! check user if registered already
    if (user_id != null) {

      const { data, error } = await supabase
        .from('user_info')
        .insert([
    { 
        // !! in the db the order is contact_nuum > address > user_id > first and last name
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        contact_num: formData.get("contact_num"),
        address: formData.get("address"),
        user_id: user_id,
    },
    ])
        .select();

      console.log(data);
      console.log(error);
    }
  } else {
    alert("Password do not match");
  }
};
