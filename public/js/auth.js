const firebaseConfig = {
  apiKey: "AIzaSyAOpASxq4Uql7nRoy2HKa5f6WFf-8WMMrA",
  authDomain: "yass-roblox-store.firebaseapp.com",
  projectId: "yass-roblox-store",
  storageBucket: "yass-roblox-store.firebasestorage.app",
  messagingSenderId: "574484848920",
  appId: "1:574484848920:web:0ec876f0d2492e7b8de76d",
  measurementId: "G-CCV0B0RB37"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const CONFIG_YASS = {
    email: "yasszz0909@gmail.com", // PASTIKAN EMAIL INI BENAR
    whatsapp: "6283898578903"
};

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const navAkun = document.getElementById('nav-akun');
    const navAdmin = document.getElementById('nav-admin');

    if (navAkun) {
        navAkun.addEventListener('click', (e) => {
            e.preventDefault();
            if (auth.currentUser) {
                window.location.href = 'order.html';
            } else {
                handleAuth();
            }
        });
    }

    auth.onAuthStateChanged(user => {
        if (user) {
            console.log("User terdeteksi:", user.email);
            
            // Update tombol login jadi foto profil
            if (loginBtn) {
                loginBtn.innerHTML = `<img src="${user.photoURL}" class="w-8 h-8 rounded-full border-2 border-blue-500 shadow-sm">`;
                loginBtn.onclick = () => window.location.href = 'order.html';
            }

            // CEK APAKAH OWNER
            if (user.email === CONFIG_YASS.email) {
                console.log("Halo Owner Yass! Menampilkan tombol admin...");
                if (navAdmin) {
                    navAdmin.classList.remove('hidden'); // MENGHAPUS CLASS HIDDEN
                    navAdmin.style.display = "flex";    // MEMASTIKAN MUNCUL
                }
            } else {
                console.log("Bukan owner, tombol admin tetap sembunyi.");
                if (window.location.pathname.includes('admin.html')) {
                    window.location.href = 'index.html';
                }
            }
        } else {
            console.log("Belum ada user yang login.");
            if (loginBtn) {
                loginBtn.innerText = "Login";
                loginBtn.onclick = (e) => handleAuth(e);
            }
            if (navAdmin) navAdmin.classList.add('hidden');
        }
    });
});

async function handleAuth(e) {
    if (e) e.preventDefault();
    try {
        await auth.signInWithPopup(provider);
    } catch (error) {
        console.error("Error Login:", error);
        alert("Gagal Login. Pastikan pop-up diizinkan.");
    }
}
