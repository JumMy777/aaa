import { supabase } from "../main";

// Function for success notification
function successNotification(message, seconds = 0) {
  const successNotificationElement = document.querySelector(".hotel_notif-success");
  successNotificationElement.classList.remove("d-none");
  successNotificationElement.classList.add("d-block");
  successNotificationElement.innerHTML = message;

  if (seconds !== 0) {
    setTimeout(function () {
      successNotificationElement.classList.remove("d-block");
      successNotificationElement.classList.add("d-none");
    }, seconds * 1000);
  }
}

// Function for error notification
function errorNotification(message, seconds = 0) {
  const errorNotificationElement = document.querySelector(".hotel-notif-error");
  errorNotificationElement.classList.remove("d-none");
  errorNotificationElement.classList.add("d-block");
  errorNotificationElement.innerHTML = message;

  if (seconds !== 0) {
    setTimeout(function () {
      errorNotificationElement.classList.remove("d-block");
      errorNotificationElement.classList.add("d-none");
    }, seconds * 1000);
  }
}

// Function to generate unique ID
async function generateUniqueID(cityId) {
  let uniqueId = cityId;
  let counter = 1;

  // Check if the ID already exists
  const { data, error } = await supabase
    .from("hotel")
    .select("id")
    .like("id", `${cityId}%`);

  if (data && data.length > 0) {
    // ID already exists, find the next available one
    while (true) {
      const newId = `${cityId}-${counter.toString().padStart(2, "0")}`;
      const idExists = data.some(item => item.id === newId);
      if (!idExists) {
        uniqueId = newId;
        break;
      }
      counter++;
    }
  }

  return uniqueId;
}

// Get the form element
const formHotel = document.getElementById("form_hotel");

// Submit event handler for the form
formHotel.onsubmit = async (e) => {
  e.preventDefault(); // Prevent the default form submission behavior

  // Disable the submit button and show loading indicator
  const submitButton = document.querySelector("#form_hotel button");
  submitButton.disabled = true;
  submitButton.innerHTML = `
    <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
    <span>Loading...</span>`;

  // Get form data
  const formData = new FormData(formHotel);

  // Generate ID based on hotel city
  const hotelCity = formData.get("hotel_city");
  const cityId = hotelCity.substring(0, 3).toLowerCase(); // Get first three characters and convert to lowercase

  // Generate unique ID
  const uniqueId = await generateUniqueID(cityId);

  // Insert data into the 'hotel' table
  const { data, error } = await supabase
    .from("hotel")
    .insert([
      {
        id: uniqueId,
        hotel_name: formData.get("hotel_name"),
        hotel_location: formData.get("hotel_location"),
        hotel_city: hotelCity,
        hotel_type: formData.get("hotel_type"),
        hotel_desc: formData.get("hotel_desc"),
      },
    ])
    .select();

  // Handle success or error
  if (error === null) {
    successNotification("Hotel added!", 10);
  } else {
    errorNotification("Something went wrong, please try again later.", 10);
    console.log(error);
  }

  // Reset the form
  formHotel.reset();

  // Enable the submit button
  submitButton.disabled = false;
  submitButton.innerHTML = `Add hotel`;
};
