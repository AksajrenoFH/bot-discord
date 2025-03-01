

// Load variabel .env (biar token aman)
require('dotenv').config();

const { error } = require('console');
// ngambil alat yg dibutuhin dri discord.js
// Client = otak bot, ngelakuin semua yg dibutuhin
// GatewayIntentBits = izin/akses yg dibutuhhin bot buat berinteraksi
const { Client, GatewayIntentBits, Collection, ChannelType } = require('discord.js');

// client = ngasih tau bot buat jalan/bekerja, dikasih beberapa izin buat ngelakuin sebuah aksi
const client = new Client({
    // akses/izin yang dibutuhin bot
    intents: [
        // izin buat ngeakses/gabung ke server discord
        GatewayIntentBits.Guilds,
        // izin buat ngasih tau klo ada pesan masuk di server discord
        GatewayIntentBits.GuildMessages,
        // izin buat negbaca isi pesan yang dikirim di server
        GatewayIntentBits.MessageContent
    ]
});

// nyiapin bot sebelum kerja/aktif/beraksi
// ready = bot udh siap serta terkoneksi sma discord, serta siap dpt perintah
client.once('ready', () => {
    // nampilin pesan 'Bot sudh online'
    // {client.user.tag} token bot yang udh ada di .env
    console.log(`Bot ${client.user.tag} sudah online!`);
});



// INTRO BOT



// event yang bakal ngejalanin klo botnya masuk server
// guild = objek yang dijadiin sebuah server
client.on('guildCreate', (guild) => {
    // guild.channels.cache = ngambil semua daftar channel di server itu
    // find = nyari channel yang sesuai syarat
    const channel = guild.channels.cache.find(
        // ch.type === 0 = mastiin klo channelnya channel teks (0 berarti text channel)
        // permissionsFor(client.user).has('SendMessages') = ngecek botnya punya izin buat ngirim pesan apa kagak, klo gk ada channelnya diskip
        ch => ch.type === ChannelType.GuildText && ch.permissionsFor(client.user).has('SendMessages')
    );
    
    // klo semisal gk nemu channel lgi skip/stop biar gk error
    if (!channel) {
        console.log(`Bot succesfully entered ${guild.name} but did not find channel to send a messages`);
        return
    }

    console.log(`Bot succesfully find a channel: ${channel.name} in ${guild.name} server`)

    // ngirim message ke channel yang udh ada ijinnya
    channel.send(
        `🇮🇩 \n` +
        // client.user.username = nama botnya
        // \`!help\` = !help (command botnya)
        `Halo semua! Salam kenal, aku ${client.user.username}, bot baru diserver ini🚀! Kalo mau tau lebih lanjut tentang commandku kamu bisa langsung ketik \`/help\` buat lihat command yang tersedia! Mohon Kerja Samanya, dan Terima Kasih<:Excited:1342867493412147211>!!!`
    );
});



// ngambil command dri folder botCommands



// fs = membaca file folder (File System)
const fs = require('fs');
// path = mengelelola file dengan aman
const path = require('path');

// ngebuat koleksi yg bakal nyimpen semua daftar command bot
// Collection = dri discord.js fungsinya jdi map javascript
client.commands = new Collection();

// commandsPath = ngegabungin path direktori utama dengan folder botCommands yg isinya file command
const commandsPath = path.join(__dirname, "botCommands");
// fs.reddirSync(commandsPath) = ngebaca semua file yang ada di folder botCommands
// filter(file => file.endsWith('.js')) = ngambil file yang belakangnya .js doang
const commandFiles = fs.readdirSync('./botCommands').filter(file => file.endsWith('.js'));

// ngelooping commandFiles yang ada di folder botCommands satu persatu
for(const file of commandFiles){
    const command = require(`./botCommands/${file}`)
    client.commands.set(command.data.name, command);
}

// interactionCreate = jalan tiap ada interaksi dri user (slash, command, tomvol, dsb)
client.on('interactionCreate', async interaction => {
    // ngecek interaksinya itu perintah slash
    // klo bukan biarin (return)
    if(!interaction.isCommand()) return;

    // ngambil command dri client.commands dri yg diketik user
    const command = client.commands.get(interaction.commandName)
    // klo commandnya gk nemu biarin(return)
    if(!command) return;

    try{
        // ngejalanin command yg sesuai interaksi dri si user (klo /help berarti nampilin menu help)
        await command.execute(interaction)
    } 
    // klo error bakal ditampilin di console
    catch (error){
        console.error(error)
        // botnya bakal ngirim message ke user secara privat
        await interaction.reply({
            content: 'Duh, ada yang error nih commandnya<:Sad2:1342828598544830587>!',
            ephemeral: true
        });
    }
});

client.on('error', (err) => console.error('Ada error di client:', err));
client.on('warn', (info) => console.warn('Peringatan:', info));

client.login(process.env.TOKEN);