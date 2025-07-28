// Smooth scroll for nav links
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

// Load accessories products
async function loadAccessories() {
  const container = document.querySelector("#productGrid");
  container.innerHTML = "";
  const q = query(collection(db, "products"), where("type", "==", "accessories"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "col-sm-6 col-md-4 col-lg-3";
    card.innerHTML = `
      <a href="/Product/detail.html?id=${doc.id}" class="text-decoration-none text-dark">
        <div class="card h-100">
          <img src="${data.image}" class="card-img-top" alt="${data.name}" onerror="this.src='default.png'">
          <div class="card-body">
            <h6 class="card-title">${data.name}</h6>
            <p class="card-text text-danger fw-bold mb-0">${parseFloat(data.price).toLocaleString()} VND</p>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);
  });
}

loadAccessories();
