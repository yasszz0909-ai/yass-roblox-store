// --- PUSAT PENGATURAN TOKO ---
const CONFIG_YASS = {
    email: "yasszz0909@gmail.com",
    whatsapp: "6283898578903" // Nomor WA Anda terpusat di sini
};

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const navAkun = document.getElementById('nav-akun');

    checkLoginStatus();

    if (loginBtn) {
        loginBtn.addEventListener('click', () => handleAuth());
    }

    if (navAkun) {
        navAkun.addEventListener('click', (e) => {
            e.preventDefault();
            handleAuth();
        });
    }
});

function checkLoginStatus() {
    const loginBtn = document.getElementById('login-btn');
    if (!loginBtn) return;
    const user = null; 
    if (user) {
        loginBtn.innerHTML = `<img src="${user.photoURL}" class="w-8 h-8 rounded-full border-2 border-blue-500">`;
        loginBtn.onclick = () => window.location.href = 'order.html';
    } else {
        loginBtn.innerText = "Login";
    }
}

function handleAuth() {
    alert("Yass Store: Menghubungkan ke Google Auth...");
    const konfirmasi = confirm("Apakah kamu ingin masuk sebagai Admin?");
    if (konfirmasi) {
        window.location.href = 'admin.html';
    }
}

function isOwner(email) {
    return email === CONFIG_YASS.email;
}
