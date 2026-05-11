import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const filePath = path.join(process.cwd(), 'users.json');

    const bacaData = () => {
        try {
            if (!fs.existsSync(filePath)) {
                fs.writeFileSync(filePath, JSON.stringify({ users: [] }));
            }
            const data = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            return { users: [] };
        }
    };

    if (req.method === 'GET') {
        const data = bacaData();
        return res.status(200).json({ status: true, users: data.users });
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ status: false, message: "data tidak lengkap" });
        }

        const data = bacaData();
        const userExists = data.users.find(u => u.username.toLowerCase() === username.toLowerCase());
        
        if (userExists) {
            return res.status(400).json({ status: false, message: "username sudah ada" });
        }

        data.users.push({ username, password });

        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
            return res.status(200).json({
                status: true,
                message: "user berhasil disimpan",
                data: { username, password }
            });
        } catch (err) {
            return res.status(500).json({ status: false, message: "gagal menulis file" });
        }
    }

    return res.status(405).json({ status: false, message: "method tidak diizinkan" });
}
