// cart.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

async function loadCart() {
  const container = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const totalItemsElement = document.getElementById("total-items");
  container.innerHTML = "";

  let total = 0;
  let totalItems = 0;
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (cart.length === 0) {
    container.innerHTML = "<p class='text-center'>Your cart is empty.</p>";
    totalPriceElement.textContent = "0 VND";
    totalItemsElement.textContent = "0";
    return;
  }

  for (const item of cart) {
    const docRef = doc(db, "products", item.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const price = parseFloat(data.price);
      const subtotal = price * item.qty;
      total += subtotal;
      totalItems += item.qty;

      const card = document.createElement("div");
      card.className = "card mb-3";
      card.innerHTML = `
        <div class="row g-0 align-items-center">
          <div class="col-md-2">
            <img src="${data.image}" class="img-fluid rounded-start" alt="${data.name}" />
          </div>
          <div class="col-md-6">
            <div class="card-body">
              <h5 class="card-title">${data.name}</h5>
              <p class="card-text">${price.toLocaleString()} VND</p>
            </div>
          </div>
          <div class="col-md-4 d-flex align-items-center justify-content-end pe-4">
            <button class="btn btn-outline-secondary me-2 minus-btn" data-id="${item.id}">-</button>
            <input type="number" min="1" value="${item.qty}" class="form-control w-25 me-2 qty-input" data-id="${item.id}" />
            <button class="btn btn-outline-secondary me-2 plus-btn" data-id="${item.id}">+</button>
            <button class="btn btn-danger remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    }
  }

  totalPriceElement.textContent = `${total.toLocaleString()} VND`;
  totalItemsElement.textContent = totalItems;
  setupCartEvents();
}

function setupCartEvents() {
  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart = cart.filter(item => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });

  document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", () => {
      const id = input.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const item = cart.find(i => i.id === id);
      if (item) {
        item.qty = Math.max(1, parseInt(input.value));
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      }
    });
  });

  document.querySelectorAll(".minus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const item = cart.find(i => i.id === id);
      if (item && item.qty > 1) {
        item.qty -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      }
    });
  });

  document.querySelectorAll(".plus-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const item = cart.find(i => i.id === id);
      if (item) {
        item.qty += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", loadCart);
