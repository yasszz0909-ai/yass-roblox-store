const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    try {
        // Mengambil path file products.json
        const dataPath = path.join(process.cwd(), 'data', 'products.json');
        
        // Membaca file
        const fileData = fs.readFileSync(dataPath, 'utf8');
        const products = JSON.parse(fileData);

        // Mengirimkan data ke frontend
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data produk" });
    }
}
