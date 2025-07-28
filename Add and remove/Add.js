// admin-add.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, getDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";

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
const analytics = getAnalytics(app);

const form = document.getElementById("productForm");
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value);
  const image = document.getElementById("productImage").value.trim();
  const type = document.getElementById("productType").value;

  if (!name || !price || !image || !type) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "products"), {
      name,
      price,
      image,
      type
    });
    alert("✅ Product added successfully with ID: " + docRef.id);
    form.reset();
  } catch (error) {
    alert("❌ Failed to add product: " + error.message);
  }
});