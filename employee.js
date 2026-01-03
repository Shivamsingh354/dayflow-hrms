import { auth, db } from "./firebase.js";
import { onAuthStateChanged } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Sidebar toggle */
window.toggleSidebar = function () {
  document.getElementById("sidebar").classList.toggle("collapsed");
};

/* Menu active */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", () => {
      document.querySelectorAll(".menu-item")
        .forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

/* 🔥 FIREBASE AUTH + FIRESTORE */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.href = "index.html";
    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) {
    alert("Employee data not found");
    return;
  }

  const data = snap.data();

  // Update UI
  document.getElementById("empName").innerText = data.name;
  document.getElementById("profileName").innerText = data.name;
  document.getElementById("profileRole").innerText = data.role;
});

/* Attendance demo */
window.checkIn = () => alert("Checked In Successfully ✅");
window.checkOut = () => alert("Checked Out Successfully ⏰");


