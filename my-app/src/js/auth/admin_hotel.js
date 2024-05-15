import { supabase, Toastify} from "../main";
// ! notifcation
// Success Notification
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

// Function to check if admin already has a hotel
async function adminHasHotel(adminId) {
  const { data, error } = await supabase
    .from("hotel")
    .select("id")
    .eq("admin_id", adminId);

  return data.length > 0;
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
  console.log(formData.get("image_path"));

  // Get admin ID (You need to implement the logic to retrieve the admin's ID)
  const adminId = "user"; // Add logic to get the admin's ID here

  // Check if admin already has a hotel
  const adminHasHotelResult = await adminHasHotel(adminId);
  if (adminHasHotelResult) {
    errorNotification("You can only create one hotel.", 10);
    // Enable the submit button
    submitButton.disabled = false;
    submitButton.innerHTML = `Add hotel`;
    return;
  }

  // Generate ID based on hotel city
  const hotelCity = formData.get("hotel_city");
  const cityId = hotelCity.substring(0, 3).toLowerCase(); // Get first three characters and convert to lowercase

  // Upload file image
  const image = formData.get("image_path");
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("hotels")
    .upload("public/" + image.name, image, {
      cacheControl: "3600",
      upsert: false,
    });

  const image_data = uploadData;

  // Insert data into the 'hotel' table
  const { data: hotelData, error: hotelError } = await supabase
    .from("hotel")
    .insert([
      {
        hotel_name: formData.get("hotel_name"),
        hotel_location: formData.get("hotel_location"),
        hotel_city: hotelCity,
        hotel_type: formData.get("hotel_type"),
        hotel_desc: formData.get("hotel_desc"),
        hotel_street: formData.get("hotel_street"),
        price_range: formData.get("price_range"),
        hotel_rate: formData.get("hotel_rate"),
        admin_id: adminId,
        image_path: image_data == null ? null : image_data.path,
      },
    ])
    .select();

  // Handle success or error
  if (uploadError == null) {
    successNotification("Hotel added!", 10);
  } else {
    errorNotification("Something went wrong, please try again later.", 10);
    console.log(uploadError);
  }

  // Reset the form
  formHotel.reset();

  // Enable the submit button
  submitButton.disabled = false;
  submitButton.innerHTML = `Add hotel`;
};
