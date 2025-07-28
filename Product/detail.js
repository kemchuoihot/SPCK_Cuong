// detail.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadProduct() {
  const pid = getProductId();
  if (!pid) {
    alert("No product ID provided.");
    return;
  }

  const docRef = doc(db, "products", pid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    document.getElementById("product-image").src = data.image;
    document.getElementById("product-name").textContent = data.name;
    document.getElementById("product-price").textContent =
      parseFloat(data.price).toLocaleString() + " VND";
    document.getElementById("product-type").textContent = data.type;
    document.getElementById("product-description").textContent =
      data.description || "No description available.";
  } else {
    alert("Product not found.");
  }
}

async function addToFirebaseCart(productId) {
  try {
    const cartsRef = collection(db, "carts");
    const q = query(cartsRef, where("user", "==", "")); // use user ID here if needed
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const data = snapshot.docs[0].data();
      const products = data.products || [];

      if (!products.includes(productId)) {
        products.push(productId);
        await updateDoc(docRef, { products });
      }
    } else {
      await addDoc(cartsRef, {
        products: [productId],
        user: ""
      });
    }
  } catch (error) {
    console.error("Error updating Firebase cart:", error);
  }
}

function setupAddToCart() {
  document.getElementById("add-to-cart").addEventListener("click", async (e) => {
    e.preventDefault();
    const pid = getProductId();
    if (!pid) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.id === pid);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: pid, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    await addToFirebaseCart(pid);
    window.location.href = "/Product/cart.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  loadProduct();
  setupAddToCart();
});
