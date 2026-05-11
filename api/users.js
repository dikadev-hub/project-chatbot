export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ status: false, message: "method not allowed" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ status: false, message: "data tidak lengkap" });
    }

    res.status(200).json({
        status: true,
        message: "user berhasil didaftarkan",
        data: { username, password }
    });
}
