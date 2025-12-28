function bukaChatOwner(orderId) {
    console.log("Membuka chat untuk pesanan ID:", orderId);
    
    // Mengambil nomor otomatis dari CONFIG_YASS yang ada di auth.js
    const pesan = `Halo Yass Store, saya ingin tanya status pesanan #${orderId}`;
    const url = `https://wa.me/${CONFIG_YASS.whatsapp}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
}

// ... (Bagian lihatDetailPesanan dan Tab Filter tetap sama) ...


// 2. Fungsi untuk Menampilkan Detail Pesanan saat diklik
function lihatDetailPesanan(orderId) {
    // Logika untuk menampilkan popup rincian barang, harga, dan bukti bayar
    alert("Menampilkan rincian untuk pesanan: " + orderId);
}

// 3. Logika Tab Filter (Semua, Menunggu, Selesai)
// Ini untuk menjalankan fungsi filter di halaman order.html
const tabs = document.querySelectorAll('.tab-filter');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Hapus kelas aktif dari semua tab
        tabs.forEach(t => t.classList.remove('border-blue-600', 'text-blue-600'));
        // Tambah kelas aktif ke tab yang diklik
        tab.classList.add('border-blue-600', 'text-blue-600');
        
        const status = tab.innerText;
        console.log("Memfilter riwayat berdasarkan status:", status);
        // Nanti panggil fungsi filterData(status)
    });
});
