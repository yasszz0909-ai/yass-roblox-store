const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    // Hanya izinkan metode POST untuk keamanan
    if (req.method === 'POST') {
        try {
            const { id, newStock, newPrice } = req.body;
            const dataPath = path.join(process.cwd(), 'data', 'products.json');
            
            // 1. Baca data produk saat ini
            const fileData = fs.readFileSync(dataPath, 'utf8');
            let products = JSON.parse(fileData);
            
            // 2. Cari produk berdasarkan ID dan update datanya
            products = products.map(product => {
                if (product.id === id) {
                    return { 
                        ...product, 
                        stok: newStock !== undefined ? newStock : product.stok,
                        harga: newPrice !== undefined ? newPrice : product.harga
                    };
                }
                return product;
            });
            
            // 3. Simpan kembali ke file products.json
            fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));

            res.status(200).json({ message: "Stok/Harga berhasil diperbarui!" });
        } catch (error) {
            res.status(500).json({ error: "Gagal memperbarui data" });
        }
    } else {
        res.status(405).json({ message: "Metode tidak diizinkan" });
    }
}
