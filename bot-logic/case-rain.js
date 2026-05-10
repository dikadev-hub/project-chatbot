export const rainChat = async (m, { prefix, command, reply }) => {
    switch (command) {
        case 'halo':
            await reply("Halo juga! Ada yang bisa Rain bantu?");
            break;

        case 'ping':
            await reply("Pong! Sistem berjalan lancar.");
            break;

        case 'status':
            await reply("Status: ONLINE\nVersi: 1.0.0\nMode: Cyber-Retro");
            break;

        case 'menu':
            const menuText = `
*MENU BOT* 🚀

- ${prefix}halo
- ${prefix}ping
- ${prefix}status
- ${prefix}fitur
- ${prefix}owner
            `.trim();
            await reply(menuText);
            break;

        case 'fitur':
            await reply("Fitur masih dalam tahap pengembangan.");
            break;

        case 'owner':
            await reply("Developer: Dika");
            break;
    }
};
