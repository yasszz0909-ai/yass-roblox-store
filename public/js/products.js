async function loadStoreData() {
    try {
        // Mengambil data dari API Vercel
        const response = await fetch('/api/get-items');
        if (!response.ok) throw new Error('Gagal memuat data');
        
        const products = await response.json();
        displayProducts(products);
        updateOwnerStatus(true); 
        
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('product-list').innerHTML = 
            '<p class="text-red-500 col-span-2 text-center text-sm">Gagal memuat produk.</p>';
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    if(!productList) return;
    productList.innerHTML = '';

    products.forEach(item => {
        const card = `
            <div class="product-card bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                <img src="${item.foto}" alt="${item.nama}" class="w-full aspect-square object-cover rounded-lg mb-2">
                <span class="text-[9px] font-bold text-blue-500 uppercase">${item.kategori}</span>
                <h4 class="text-xs font-bold text-gray-800 leading-tight h-8 mb-1">${item.nama}</h4>
                <p class="text-[10px] text-gray-500 mb-2">${item.keterangan}</p>
                <div class="flex justify-between items-center mt-auto">
                    <span class="text-sm font-bold text-orange-500">Rp ${item.harga.toLocaleString('id-ID')}</span>
                    <button onclick="beliProduk('${item.id}', '${item.nama}')" class="bg-blue-600 text-white p-1.5 rounded-lg active:scale-90 transition-transform">
                        <i class="fas fa-shopping-cart text-xs"></i>
                    </button>
                </div>
            </div>
        `;
        productList.innerHTML += card;
    });
}

function updateOwnerStatus(isOnline) {
    const dot = document.getElementById('status-dot');
    const text = document.getElementById('status-text');
    if(dot && text) {
        dot.className = 'w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]';
        text.innerText = 'Online (Fast Response)';
        text.className = 'text-[10px] font-bold text-green-600 uppercase tracking-wider';
    }
}

// ... (Bagian loadStoreData dan displayProducts tetap sama) ...

function beliProduk(id, nama) {
    const pesan = `Halo Yass Store, saya ingin membeli ${nama} (ID: ${id})`;
    // Mengambil nomor otomatis dari CONFIG_YASS yang ada di auth.js
    const url = `https://wa.me/${CONFIG_YASS.whatsapp}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank');
}

loadStoreData();
