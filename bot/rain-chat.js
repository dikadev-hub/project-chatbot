async function balas(pesanInput) {
    const budy = pesanInput.toLowerCase();
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
            const teksMenu = `*rain bot v1 - menu*\n\n- .owner\n- .runtime\n- .waktu\n- .quotes\n- .create /user [nama] | [pass]\n\nsilahkan ketik perintah di atas.`;
            return await m.reply(teksMenu.trim(), "https://i.ibb.co.com/zVykFCrG/wkcfhd.jpg", "[ all menu ]");

        case '.create':
            if (pesanInput.includes('/user')) {
                const parts = pesanInput.split('|');
                if (parts.length < 2) return await m.reply("format salah! contoh: *.create /user dika | 123*");

                const username = parts[0].replace(/.create\s+\/user\s+/i, '').trim();
                const password = parts[1].trim();

                try {
                    const response = await fetch('/api/users', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ username, password })
                    });
                    const hasil = await response.json();

                    if (hasil.status) {
                        return await m.reply(`user berhasil dibuat\n\nusername: ${username}\npassword: ${password}\nstatus: saved to json`);
                    } else {
                        return await m.reply("gagal mendaftarkan user.");
                    }
                } catch (err) {
                    return await m.reply("error: koneksi api gagal.");
                }
            }
            break;

        case '[ all menu ]':
        case '.allmenu':
            const teksAllMenu = `*daftar semua menu*\n\n1. .owner\n2. .runtime\n3. .waktu\n4. .quotes\n5. .donasi\n6. .info\n7. .ping\n\nklik salah satu perintah untuk menjalankan.`;
            return await m.reply(teksAllMenu.trim());

        case '.owner':
            const teksOwner = `*kontak owner*\n\nnama: dika dev\nstatus: active\n\nsilahkan hubungi melalui tombol di bawah ini.`;
            return await m.reply(teksOwner.trim(), null, "chat whatsapp", "https://wa.me/6283121495921", "#25D366");

        case '.runtime':
            return await m.reply("status: *online*\nengine: *v8 javascript*");

        case '.waktu':
            const jam = new Date().toLocaleTimeString('id-ID');
            return await m.reply(`waktu saat ini:\n*${jam} wib*`);

        case '.quotes':
            const q = ["teruslah belajar.", "koding itu seni.", "bug adalah teman."];
            return await m.reply(`"${q[Math.floor(Math.random() * q.length)]}"`);

        case '.donasi':
            return await m.reply("dukung rain via dana/gopay: 08xxxxxx");

        default:
            return await m.reply("ketik *.menu* untuk bantuan.");
    }
}
