import { supabase, Toastify } from "../main";

// Function for success notification
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

// Function for error notification
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

// Function to generate unique ID
async function generateUniqueID(cityId) {
  let uniqueId = cityId;
  let counter = 1;

  const { data, error } = await supabase
    .from("hotel")
    .select("id")
    .like("id", `${cityId}%`);

  if (data && data.length > 0) {
    while (true) {
      const newId = `${cityId}-${counter.toString().padStart(2, "0")}`;
      const idExists = data.some((item) => item.id === newId);
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

  // Get the current user's ID from user_info table
  const { data: userData, error: userError } = await supabase
    .from("user_info")
    .select("id")
    .eq("auth_user_id", supabase.auth.user().id);

  if (userError) {
    // Handle error
    console.error("Error fetching user info:", userError);
    return;
  }

  // Extract the user ID from the query result
  const adminId = userData[0]?.id;

  // Insert data into the 'hotel' table
  const { data: hotelData, error: hotelError } = await supabase
    .from("hotel")
    .insert([
      {
        id: uniqueId,
        hotel_name: formData.get("hotel_name"),
        hotel_location: formData.get("hotel_location"),
        hotel_city: hotelCity,
        hotel_type: formData.get("hotel_type"),
        hotel_desc: formData.get("hotel_desc"),
        hotel_street: formData.get("hotel_street"),
        price_range: formData.get("price_range"),
        hotel_rate: formData.get("hotel_rate"),
        admin_id: adminId,
      },
    ])
    .select();

  // Handle success or error for hotel insertion
  if (hotelError === null) {
    successNotification("Hotel added!");
  } else {
    errorNotification("Something went wrong, please try again later.");
    console.error(hotelError);
  }

  // Reset the form
  formHotel.reset();

  // Enable the submit button
  submitButton.disabled = false;
  submitButton.innerHTML = `Add hotel`;
};
