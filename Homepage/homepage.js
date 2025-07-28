// Smooth scroll for nav links
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjL_buOw2so_qfTtolR68P1THd7SPKpvQ",
  authDomain: "cupid-store-e3a15.firebaseapp.com",
  projectId: "cupid-store-e3a15",
  storageBucket: "cupid-store-e3a15.firebasestorage.app",
  messagingSenderId: "720943524568",
  appId: "1:720943524568:web:b2baa1b7090b67cb71c5ad",
  measurementId: "G-S5KRTYZLDT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load featured products (limited to 4 newest)
async function loadProducts() {
  const container = document.querySelector("#featured .row");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));

  const products = [];
  querySnapshot.forEach(doc => {
    products.push({ id: doc.id, ...doc.data() });
  });

  const latest = products.slice(0, 4); // Only get first 4

  latest.forEach((data) => {
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3";
    card.innerHTML = `
      <a href="/Product/detail.html?id=${data.id}" class="text-decoration-none text-dark">
        <div class="card h-100">
          <img src="${data.image}" class="card-img-top" alt="${data.name}" onerror="this.src='default.png'">
          <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text text-danger fw-bold">${parseFloat(data.price).toLocaleString()} VND</p>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
}

loadProducts();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Newsletter form message
document.querySelector("form").addEventListener("submit", function (e) {
  if (this.querySelector("input[type='email']")) {
    e.preventDefault();
    const emailInput = this.querySelector("input[type='email']");
    if (emailInput.value.trim() !== "") {
      alert(`Thanks for subscribing, ${emailInput.value.trim()}!`);
      emailInput.value = "";
    }
  }
});

// Toggle search input
document.querySelector(".fa-search").addEventListener("click", () => {
  const box = document.getElementById("searchBox");
  box.classList.toggle("show");
  if (box.classList.contains("show")) {
    document.getElementById("searchInput").focus();
  }
});

// Close on outside click
document.addEventListener("click", (e) => {
  const box = document.getElementById("searchBox");
  const icon = document.querySelector(".fa-search");
  if (!box.contains(e.target) && !icon.contains(e.target)) {
    box.classList.remove("show");
  }
});
