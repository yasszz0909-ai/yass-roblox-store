// Konfigurasi dari screenshot Firebase kamu
const firebaseConfig = {
  apiKey: "AIzaSyAOpASxq4Uql7nRoy2HKa5f6WFf-8WMMrA",
  authDomain: "yass-roblox-store.firebaseapp.com",
  projectId: "yass-roblox-store",
  storageBucket: "yass-roblox-store.firebasestorage.app",
  messagingSenderId: "574484848920",
  appId: "1:574484848920:web:0ec876f0d2492e7b8de76d",
  measurementId: "G-CCV0B0RB37"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const CONFIG_YASS = {
    email: "yasszz0909@gmail.com",
    whatsapp: "6283898578903"
};

document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(user => {
        const loginBtn = document.getElementById('login-btn');
        if (user) {
            // Jika login berhasil
            if (loginBtn) {
                loginBtn.innerHTML = `<img src="${user.photoURL}" class="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm">`;
                loginBtn.onclick = () => window.location.href = 'order.html';
            }
            
            // Proteksi Admin
            if (window.location.pathname.includes('admin.html')) {
                if (user.email !== CONFIG_YASS.email) {
                    alert("Akses Ditolak!");
                    window.location.href = 'index.html';
                }
            }
        } else {
            // Jika belum login
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.onclick = () => handleAuth();
            }
            if (window.location.pathname.includes('admin.html')) {
                window.location.href = 'index.html';
            }
        }
    });
});

async function handleAuth() {
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Error:", error);
        alert("Gagal Login. Pastikan popup diizinkan.");
    }
}
