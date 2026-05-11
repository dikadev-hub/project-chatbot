async function balas(pesanInput) {
    const budy = pesanInput.toLowerCase();
    const command = budy.split(' ')[0];
    const args = budy.split(' ').slice(1);
    const text = args.join(' ');

    const m = {
        body: budy,
        command: command,
        args: args,
        reply: (teks, image = null) => {
            return { teks, image };
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
        case '#help':
            const menuTeks = `*RAIN BOT V1 - MENU*\n\n- #owner\n- #runtime\n- #waktu\n- #quotes\n\n_Silahkan pilih menu di atas._`;
            return await m.reply(menuTeks.trim(), "https://i.ibb.co.com/zVykFCrG/wkcfhd.jpg");
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
            const listQuotes = [
                "Koding adalah seni.",
                "Jangan menyerah pada bug.",
                "Teruslah berkarya."
            ];
            const random = listQuotes[Math.floor(Math.random() * listQuotes.length)];
            return await m.reply(`_“${random}”_`);
            break;

        default:
            if (budy.includes("pagi")) return await m.reply("Selamat pagi!");
            if (budy.includes("malam")) return await m.reply("Selamat malam!");
            return await m.reply("Ketik *#menu* untuk bantuan.");
            break;
    }
}