// 1. Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyAOpASxq4Uql7nRoy2HKa5f6WFf-8WMMrA",
  authDomain: "yass-roblox-store.firebaseapp.com",
  projectId: "yass-roblox-store",
  storageBucket: "yass-roblox-store.firebasestorage.app",
  messagingSenderId: "574484848920",
  appId: "1:574484848920:web:0ec876f0d2492e7b8de76d",
  measurementId: "G-CCV0B0RB37"
};

// 2. Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// Data Owner
const CONFIG_YASS = {
    email: "yasszz0909@gmail.com",
    whatsapp: "6283898578903"
};

document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen-elemen UI
    const loginBtn = document.getElementById('login-btn');
    const navAkun = document.getElementById('nav-akun');
    const navAdmin = document.getElementById('nav-admin');

    // 3. Logika Klik Tombol Akun (Navbar Bawah)
    if (navAkun) {
        navAkun.addEventListener('click', (e) => {
            e.preventDefault();
            const user = auth.currentUser;
            if (user) {
                window.location.href = 'order.html'; // Jika sudah login ke riwayat
            } else {
                handleAuth(); // Jika belum login ke Google
            }
        });
    }

    // 4. Pantau Status Login secara Real-Time
    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("Logged in as:", user.email);

            // Ganti tombol Login di header menjadi foto profil
            if (loginBtn) {
                loginBtn.innerHTML = `<img src="${user.photoURL}" class="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm">`;
                loginBtn.onclick = () => window.location.href = 'order.html';
            }

            // CEK APAKAH USER ADALAH OWNER
            if (user.email === CONFIG_YASS.email) {
                // Munculkan tombol Admin di navbar jika ada
                if (navAdmin) navAdmin.classList.remove('hidden');
            } else {
                // Jika bukan owner tapi mencoba buka halaman admin, tendang ke home
                if (window.location.pathname.includes('admin.html')) {
                    alert("Akses Ditolak! Anda bukan Owner.");
                    window.location.href = 'index.html';
                }
            }
        } else {
            // JIKA TIDAK LOGIN
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.onclick = (e) => handleAuth(e);
            }
            
            // Sembunyikan tombol admin
            if (navAdmin) navAdmin.classList.add('hidden');

            // Tendang dari halaman admin jika belum login
            if (window.location.pathname.includes('admin.html')) {
                window.location.href = 'index.html';
            }
        }
    });
});

// 5. Fungsi Login Pop-up
async function handleAuth(e) {
    if (e) e.preventDefault();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Error Login:", error);
        alert("Gagal Login. Pastikan pop-up diizinkan di browser Chrome Anda.");
    }
}

// Fungsi Logout
function logout() {
    auth.signOut().then(() => window.location.href = 'index.html');
}
