export default async function handler(req, res) {
    const GITHUB_TOKEN = process.env.GH_TOKEN;
    const REPO_OWNER = "dikadev-hub";
    const REPO_NAME = "project-chatbot";
    const FILE_PATH = "users.json";

    if (!GITHUB_TOKEN) {
        return res.status(500).json({ status: false, message: "Server Error: GH_TOKEN belum dipasang di Vercel." });
    }

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

    try {
        if (req.method === 'GET') {
            const response = await fetch(url, {
                headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` }
            });
            
            if (!response.ok) return res.status(404).json({ status: false, message: "File users.json tidak ditemukan di repo." });

            const data = await response.json();
            const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'));
            return res.status(200).json({ status: true, users: content.users || [] });
        }

        if (req.method === 'POST') {
            const { username, password } = req.body;
            if (!username || !password) return res.status(400).json({ status: false, message: "Username & Password wajib diisi." });

            const getFile = await fetch(url, {
                headers: { "Authorization": `Bearer ${GITHUB_TOKEN}` }
            });
            
            if (!getFile.ok) return res.status(404).json({ status: false, message: "Gagal mengambil data lama dari GitHub." });

            const fileData = await getFile.json();
            const sha = fileData.sha;
            const content = JSON.parse(Buffer.from(fileData.content, 'base64').toString('utf-8'));

            if (content.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
                return res.status(400).json({ status: false, message: "Username sudah terdaftar." });
            }

            content.users.push({ username, password });

            const updateFile = await fetch(url, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${GITHUB_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: `Rain Bot: Tambah user ${username}`,
                    content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
                    sha: sha
                })
            });

            if (updateFile.ok) {
                return res.status(200).json({ status: true, message: "Berhasil disimpan." });
            } else {
                const err = await updateFile.json();
                return res.status(500).json({ status: false, message: err.message });
            }
        }
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal Error: " + error.message });
    }
}
