// shoes.js
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

async function loadShoes() {
  const container = document.getElementById("productGrid");
  container.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "products"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.type?.toLowerCase() === "shoes") {
      const card = document.createElement("div");
      card.className = "col-sm-6 col-md-4";
      card.innerHTML = `
        <a href="/Product/detail.html?id=${doc.id}" class="text-decoration-none text-dark">
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
    }
  });
}

loadShoes();
