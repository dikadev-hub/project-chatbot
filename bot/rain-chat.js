async function balas(pesanInput) {
    const budy = pesanInput.toLowerCase();
    const command = budy.split(' ')[0];

    const m = {
        reply: (teks, image = null, button = null) => {
            return { teks, image, button };
        }
    };

    switch (command) {
        case 'p':
        case 'hai':
        case 'halo':
        case 'rain':
            return await m.reply("Hai! Aku Rain. Ketik *#menu* untuk melihat fitur yang tersedia.");
            break;

        case '#menu':
            const teksMenu = `*RAIN BOT V1 - MENU*\n\n- #owner\n- #runtime\n- #waktu\n- #quotes\n\n_Silahkan klik tombol di bawah untuk melihat daftar lengkap._`;
            return await m.reply(teksMenu.trim(), "https://i.ibb.co.com/zVykFCrG/wkcfhd.jpg", "[ ALL MENU ]");
            break;

        case '[ all menu ]':
        case '#allmenu':
            const teksAllMenu = `*DAFTAR SEMUA MENU*\n\n1. #owner\n2. #runtime\n3. #waktu\n4. #quotes\n5. #donasi\n6. #info\n7. #ping\n\n_Klik salah satu perintah untuk menjalankan._`;
            return await m.reply(teksAllMenu.trim());
            break;

        case '#owner':
            return await m.reply("Owner saya adalah *Dika Dev*.");
            break;

        case '#runtime':
            return await m.reply("Status: *Online*\nEngine: *V8 JavaScript*");
            break;

        case '#waktu':
            const jam = new Date().toLocaleTimeString('id-ID');
            return await m.reply(`Waktu saat ini:\n*${jam} WIB*`);
            break;

        case '#quotes':
            const q = ["Teruslah belajar.", "Koding itu seni.", "Bug adalah teman."];
            return await m.reply(`_“${q[Math.floor(Math.random() * q.length)]}”_`);
            break;

        case '#donasi':
            return await m.reply("Dukung Rain via Dana/Gopay: *08xxxxxx*");
            break;

        default:
            return await m.reply("Ketik *#menu* untuk bantuan.");
            break;
    }
}
