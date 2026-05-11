async function balas(pesanInput) {
    const budy = pesanInput.toLowerCase().trim();
    const command = budy.split(' ')[0];

    const m = {
        reply: (teks, image = null, button = null, link = null, color = 'white') => {
            return { teks, image, button, link, color };
        }
    };

    switch (command) {
        case 'p':
        case 'hai':
        case 'halo':
        case 'rain':
            return await m.reply("hai! aku rain. ketik *.menu* untuk melihat fitur yang tersedia.");

        case '.menu':
            const teksMenu = `*rain bot v1 - menu*\n\n- .owner\n- .runtime\n- .listuser\n- .create /user [nama] | [pass]\n\nsilahkan ketik perintah di atas.`;
            return await m.reply(teksMenu.trim(), "https://i.ibb.co.com/zVykFCrG/wkcfhd.jpg", "[ all menu ]");

        case '.create':
            if (budy.includes('/user') && budy.includes('|')) {
                try {
                    const bagianData = pesanInput.split('/user')[1]; 
                    const parts = bagianData.split('|');
                    const username = parts[0].trim();
                    const password = parts[1].trim();

                    if (!username || !password) {
                        return await m.reply("gagal: nama atau password tidak boleh kosong.");
                    }

                    const response = await fetch('/api/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const hasil = await response.json();

                    if (hasil.status) {
                        return await m.reply(`user berhasil dibuat\n\nusername: ${username}\npassword: ${password}\nstatus: saved to json`);
                    } else {
                        return await m.reply("gagal: " + hasil.message);
                    }
                } catch (err) {
                    return await m.reply("error: koneksi api gagal.");
                }
            } else {
                return await m.reply("format salah. contoh:\n*.create /user dika | 123*");
            }

        case '.listuser':
            try {
                const response = await fetch('/api/users');
                const hasil = await response.json();
                
                if (hasil.status && hasil.users) {
                    let teksList = "*daftar user terdaftar*\n\n";
                    if (hasil.users.length === 0) {
                        teksList += "belum ada user yang terdaftar.";
                    } else {
                        hasil.users.forEach((user, i) => {
                            teksList += `${i + 1}. ${user.username} (pass: ${user.password})\n`;
                        });
                        teksList += "\ntotal user: " + hasil.users.length;
                    }
                    
                    return await m.reply(teksList.trim(), "https://i.ibb.co.com/zVykFCrG/wkcfhd.jpg", ".menu");
                } else {
                    return await m.reply("gagal mengambil daftar user.");
                }
            } catch (err) {
                return await m.reply("error: gagal terhubung ke server.");
            }

        case '.owner':
            return await m.reply("*kontak owner*\n\nnama: dika dev\nstatus: active", null, "chat whatsapp", "https://wa.me/6283121495921", "#25D366");

        case '.runtime':
            return await m.reply("status: *online*\nengine: *v1 javascript*");

        case '.waktu':
            const jam = new Date().toLocaleTimeString('id-ID');
            return await m.reply(`waktu saat ini:\n*${jam} wib*`);

        case '.quotes':
            const q = ["teruslah belajar.", "koding itu seni.", "bug adalah teman."];
            return await m.reply(`"${q[Math.floor(Math.random() * q.length)]}"`);

        default:
            return await m.reply("ketik *.menu* untuk bantuan.");
    }
}
