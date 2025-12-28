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
    // 1. Ambil elemen tombol
    const loginBtn = document.getElementById('login-btn');
    const navAkun = document.getElementById('nav-akun');

    // 2. Logika Klik Tombol Akun (Navbar Bawah)
    if (navAkun) {
        navAkun.addEventListener('click', (e) => {
            e.preventDefault(); // Mencegah munculnya '#' di URL
            const user = auth.currentUser;
            if (user) {
                window.location.href = 'order.html';
            } else {
                handleAuth();
            }
        });
    }

    // 3. Pantau Status Login
    auth.onAuthStateChanged(user => {
        if (user) {
            // Jika login berhasil, ganti tombol Login (atas) jadi foto profil
            if (loginBtn) {
                loginBtn.innerHTML = `<img src="${user.photoURL}" class="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm">`;
                loginBtn.onclick = () => window.location.href = 'order.html';
            }
            
            // Proteksi Admin: Hanya email owner yang boleh masuk admin.html
            if (window.location.pathname.includes('admin.html')) {
                if (user.email !== CONFIG_YASS.email) {
                    alert("Akses Ditolak! Anda bukan Owner.");
                    window.location.href = 'index.html';
                }
            }
        } else {
            // Jika belum login
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.onclick = (e) => handleAuth(e);
            }
            // Tendang dari halaman admin jika tidak login
            if (window.location.pathname.includes('admin.html')) {
                window.location.href = 'index.html';
            }
        }
    });
});

// 4. Fungsi Login Pop-up
async function handleAuth(e) {
    if (e) e.preventDefault();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Error Login:", error);
        alert("Gagal Login. Pastikan pop-up diizinkan di browser Anda.");
    }
}

// Fungsi Logout (bisa dipanggil jika perlu)
function logout() {
    auth.signOut().then(() => window.location.href = 'index.html');
}
