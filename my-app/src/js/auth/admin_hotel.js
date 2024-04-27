import { supabase } from "../main";
// !! functionality for notification
// Success Notification
function successNotification(message, seconds = 0) {
  document.querySelector(".hotel_notif-success").classList.remove("d-none");
  document.querySelector(".hotel_notif-success").classList.add("d-block");
  document.querySelector(".hotel_notif-success").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".hotel_notif-success").classList.remove("d-block");
      document.querySelector(".hotel_notif-success").classList.add("d-none");
    }, seconds * 1000);
  }
}

// Error Notification
function errorNotification(message, seconds = 0) {
  document.querySelector(".hotel-notif-error").classList.remove("d-none");
  document.querySelector(".hotel-notif-error").classList.add("d-block");
  document.querySelector(".hotel-notif-error").innerHTML = message;

  if (seconds != 0) {
    setTimeout(function () {
      document.querySelector(".hotel-notif-error").classList.remove("d-block");
      document.querySelector(".hotel-notif-error").classList.add("d-none");
    }, seconds * 1000);
  }
}

// !! end of functionality

const form_hotel = document.getElementById("form_hotel");

form_hotel.onsubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  //!! Disable the submit button
  document.querySelector("#form_hotel button").disabled = true;
  document.querySelector("#form_hotel button").innerHTML =
    `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span>Loading...</span>`;

  // !! get value from form
  const formData = new FormData(form_hotel);

  const { data, error } = await supabase
    .from("hotel")
    .insert([
      {
        // !! in the db the order is contact_nuum > address > user_id > first and last name
        hotel_name: formData.get("hotel_name"),
        hotel_location: formData.get("hotel_location"),
        hotel_city: formData.get("hotel_city"),
        hotel_type: formData.get("hotel_type"),
        hotel_desc: formData.get("hotel_desc"),
      },
    ])
    .select();

  //!! Enable Submit Button
  document.querySelector("#form_hotel button").disabled = false;
  document.querySelector("#form_hotel button").innerHTML = `Add hotel`;

  if (error == null) {
    successNotification("Hotel added!", 10);
  } else {
    errorNotification("Something went wrong, please try again later.", 10);
    
  }
  
  //!! Reset Form
  form_hotel.reset();
};
