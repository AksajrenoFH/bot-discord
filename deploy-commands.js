// load var file .env ke process.env buat ngambil token, client_id sma guild_id dri .env
require('dotenv').config();
// buat var error
const { error } = require('console');
// ngeimport rest sma routes dri discord.js buat didaftarin ke discord API
const{REST, Routes} = require('discord.js');
// ngeimport modul fs buat ngebaca file command
const fs = require('fs');
const { register } = require('module');
// ngeimport modul path buat ngemanipulasiin folder/file
const path = require('path');

// ngambil token bot dri .env
const token = process.env.TOKEN;
// ngambil client_id dri .env
const clientId = process.env.CLIENT_ID;
// ngambil guild_id dri .env
const guildId = process.env.GUILD_ID;


// arraynya kosong buat nyimpen command yang didaftarin
const commands = [];
// tempat command disimpen
const commandsPath = path.join(__dirname, 'botCommands')
// fs.readdirSync(commandsPath) = ngebaca semua file di folder botCommands
// filter(file => file.endsWith('.js')) = ngambil dile yang akhirnya .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

// ngelooping semua file
for(const file of commandFiles){
    // ngambil path lengkap dri tiap file command
    const filePath = path.join(commandsPath, file);
    // ngeimport file command(contoh: help.js)
    const command = require(filePath);
    // apa filenya punya data sma execute
    if ('data' in command && 'execute' in command){
        // klo punya convert data ke JSON sma ngepush ke array commands
        commands.push(command.data.toJSON())
    } else{
        // klo gk ada kasih peringatan ke console
        console.log(`[WARNING] Command in ${filePath} don't have data property or execute!`);
    }
    // data = ngedeskripsiin command ke discord
    //  execute = ngeeksekusi command yg dijalanin sama si user
};

// REST ({version: '10'}) = ngebuat objek REST API Discord ke verrsi 10
// setToken(token) = ngeset token bot biar bisa diakses sma API Disccord
const rest = new REST ({version: '10'}).setToken(token);

// async langsung dipanggil tanpa perlu dipanggil secara manual, dipake buat bisa await di dalemnya
async function registerCommands() {
    try{
        // nampilin jumlah command yg didaftarin
        console.log(`Currently registering ${commands.length} command to Discord...`);
        // Routes.applicationGuildCommands(clientId, guildId) = Endpoint buat daftarin guild commands(langsung tanpa perlu lama)
        // {body: commands} = ngirim semua command yg udh dikumpulin di API Discord
        await rest.put(Routes.applicationGuildCommands(clientId, guildId),{body: commands});

        // semua command udh keregister
        console.log(`✅All commands succesfully registered`)
    } catch(err){
        // klo ada error
        console.error(`[ERROR] Failed to register a commands:`, err);
        // klo kena rate limit dari discord, bakal nyoba ulang lgi tpi nunggu dlu
        if (err.status === 429){
            console.log(`⚠️Rate limited! Retrying in a few seconds...`)
            setTimeout(registerCommands, err.retry_after * 1000);
        }
    }
}
// manggil registerCommands
registerCommands();