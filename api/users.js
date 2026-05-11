export default async function handler(req, res) {
    const GITHUB_TOKEN = process.env.GH_TOKEN;
    const REPO_OWNER = "dikadev-hub";
    const REPO_NAME = "project-chatbot";
    const FILE_PATH = "users.json";

    const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

    if (req.method === 'GET') {
        try {
            const response = await fetch(url, {
                headers: { Authorization: `token ${GITHUB_TOKEN}` }
            });
            const data = await response.json();
            const content = JSON.parse(atob(data.content));
            return res.status(200).json({ status: true, users: content.users });
        } catch (e) {
            return res.status(500).json({ status: false, message: "gagal baca github" });
        }
    }

    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const getFile = await fetch(url, {
                headers: { Authorization: `token ${GITHUB_TOKEN}` }
            });
            const fileData = await getFile.json();
            const sha = fileData.sha;
            const content = JSON.parse(atob(fileData.content));

            if (content.users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
                return res.status(400).json({ status: false, message: "user sudah ada" });
            }

            content.users.push({ username, password });

            const updateFile = await fetch(url, {
                method: 'PUT',
                headers: {
                    Authorization: `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: `tambah user ${username}`,
                    content: btoa(JSON.stringify(content, null, 2)),
                    sha: sha
                })
            });

            if (updateFile.ok) {
                return res.status(200).json({ status: true, message: "berhasil simpan" });
            } else {
                return res.status(500).json({ status: false, message: "gagal tulis ke github" });
            }
        } catch (e) {
            return res.status(500).json({ status: false, message: "error sistem github" });
        }
    }
}
