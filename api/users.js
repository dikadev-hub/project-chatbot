import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const users = await kv.get('users') || [];
            return res.status(200).json({ status: true, users });
        } catch (e) {
            return res.status(500).json({ status: false, message: "gagal ambil data" });
        }
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ status: false, message: "data tidak lengkap" });
        }

        try {
            let users = await kv.get('users') || [];
            const userExists = users.find(u => u.username.toLowerCase() === username.toLowerCase());
            
            if (userExists) {
                return res.status(400).json({ status: false, message: "username sudah ada" });
            }

            users.push({ username, password });
            await kv.set('users', users);

            return res.status(200).json({
                status: true,
                message: "user berhasil disimpan ke database",
                data: { username, password }
            });
        } catch (e) {
            return res.status(500).json({ status: false, message: "error database: pastikan token kv sudah dipasang" });
        }
    }

    return res.status(405).json({ status: false, message: "method tidak diizinkan" });
    }
