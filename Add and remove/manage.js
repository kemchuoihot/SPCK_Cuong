import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjL_buOw2so_qfTtolR68P1THd7SPKpvQ",
  authDomain: "cupid-store-e3a15.firebaseapp.com",
  projectId: "cupid-store-e3a15",
  storageBucket: "cupid-store-e3a15.firebasestorage.app",
  messagingSenderId: "720943524568",
  appId: "1:720943524568:web:b2baa1b7090b67cb71c5ad",
  measurementId: "G-S5KRTYZLDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch products
async function getProducts() {
  const result = await getDocs(collection(db, "products"));
  const products = [];
  result.forEach((docSnap) => {
    products.push({ id: docSnap.id, ...docSnap.data() });
  });
  return products;
}

// Display products
async function displayProducts() {
  const container = document.getElementById("productsContainer");
  const products = await getProducts();
  container.innerHTML = "";

  products.forEach((product) => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text fw-semibold">${parseFloat(product.price).toLocaleString()} VND</p>
          <p class="text-muted small mb-2">Type: ${product.type}</p>
          <button class="btn btn-danger btn-sm w-100 delete" data-id="${product.id}">
            <i class="fa-solid fa-trash"></i> Delete
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.stopPropagation();
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this product?")) {
        await deleteDoc(doc(db, "products", id));
        alert("✅ Product deleted successfully");
        displayProducts();
      }
    });
  });
}

displayProducts();