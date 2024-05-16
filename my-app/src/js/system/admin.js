import { supabase, Toastify } from "../main";

// Load the user's information
getUserInfo();

// Get the user's information
async function getUserInfo() {
  const { user } = await supabase.auth.getUser();

  // If the user is logged in, get the user's information
  if (user != null) {
    let { data: user_info, error } = await supabase
      .from("user_info")
      .select("first_name, last_name, address, contact_num")
      .eq("user_id", user.id);
    console.log(user_info);
    
    // Call the function to check if admin already has a hotel
    const adminId = await getAdminId(user.id);
    const adminHasHotelResult = await adminHasHotel(adminId);

    if (adminHasHotelResult) {
      // Hide the element with id "hide_have_hotel"
      const elementToHide = document.getElementById("hide_have_hotel");
      if (elementToHide) {
        elementToHide.classList.add("d-none");
      }
    }
  }
}

// !! functionality for notification
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

// Function to get admin ID
async function getAdminId(userId) {
  const { data: userInfo, error } = await supabase
    .from("user_info")
    .select("id")
    .eq("user_id", userId)
    .single();
  return userInfo.id;
}

// Function to check if admin already has a hotel
async function adminHasHotel(adminId) {
  const { data, error } = await supabase
    .from("hotel")
    .select("admin_id")
    .eq("admin_id", adminId);
  return data.length > 0;
}

const btn_logout = document.getElementById("btn_logout");
btn_logout.onclick = async () => {
  let { error } = await supabase.auth.signOut();

  if (error == null) {
    successNotification("Log out successful!", 3);
    // ! clear local storage
    localStorage.clear();

    // ! redirect to index.html
    window.location.pathname = "/";
  } else {
    errorNotification("Log out failed!", 3);
  }
};
