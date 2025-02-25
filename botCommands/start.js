// ngebuat perintah /start dri discord.js (diimport)
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
// fs = membaca file folder (File System)
const fs = require('fs');
// path = mengelelola file dengan aman
const path = require('path');

// nentuin file users.json buat nyimpen data user
const dataPath = path.join(__dirname, "../users.json");

// ngeekspor command biar bisa dipake di file lain
module.exports = {
    // ngebuat command baru
    data: new SlashCommandBuilder()
        // nama commandnya /start
        .setName('start')
        // deskripsi commandnya di discord
        .setDescription(
            "Mulai permainan dan atur profilmu!"
        ),
    // klo /start dipake ini jalan/bekerja
    async execute(interaction){

        let users = {}
        // ngecek file users.json udh ada apa blm
        if (fs.existsSync(dataPath)){
            // JSON.parse = ngubah data JSON dri file jdi objek JS
            // fs.readFileSync(dataPath, 'utf-8') = klo file users.json ada, bacain isinya
            // klo blm ada usersnya msi kosong = {}
            users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        }

        // ngecek user udh didaftarin ke users.json apa blm
        const userId = interaction.user.id;

        if (users[userId]){
            // klo udh ada di users.json kirim ini ke user secara privat
            const embed = new EmbedBuilder()
                .setColor(0xA56EFF)
                .setTitle("⚠️User terpantau sudah daftar!⚠️")
                .setDescription("Eitts, kamu sudah daftar😏! Gunakan `/adventure` untuk langsung memulai permainan")
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        }
        // klo blm ada di users.json tambahin users data awal kyk gini
        else {
            users[userId] = {
                // nama user
                name: interaction.user.username, 
                // level user
                level: 1, 
                // exp user
                exp: 0
            };

            // simpen data user ke users.json
            fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

            // kirim ini ke user biar dia tau kalo udh bisa akses /adventure
            const embed = new EmbedBuilder()
                .setColor(0xA56EFF)
                .setTitle("✅Kamu sudah didaftarkan!✅")
                .setDescription("Selamat datang user baru🥳! Langsung mulai dengan menggunakan command `/adventure` untuk memulai permainan!")
                .setTimestamp();

            await interaction.reply({
                embeds: [embed],
                ephemeral: false
            });
        }
    }
};