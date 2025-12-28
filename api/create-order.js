const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const newOrder = req.body;
            const dataPath = path.join(process.cwd(), 'data', 'orders.json');
            
            // Baca data lama
            const fileData = fs.readFileSync(dataPath, 'utf8');
            const orders = JSON.parse(fileData);
            
            // Tambah pesanan baru
            orders.push(newOrder);
            
            // Simpan kembali (Catatan: Di Vercel Production, penulisan file fs.write tidak permanen, 
            // nanti kita akan butuh Database asli jika sudah besar, tapi untuk awal ini cukup)
            fs.writeFileSync(dataPath, JSON.stringify(orders, null, 2));

            res.status(200).json({ message: "Pesanan berhasil dibuat!" });
        } catch (error) {
            res.status(500).json({ error: "Gagal memproses pesanan" });
        }
    } else {
        res.status(405).json({ message: "Hanya menerima metode POST" });
    }
}
