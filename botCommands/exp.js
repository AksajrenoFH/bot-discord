// ngebuat perintah /start dri discord.js (diimport)
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
// path = mengelelola file dengan aman
const path = require('path');

// nentuin file users.json buat nyimpen data user
const dataPath = path.join(__dirname, "../users.json");

// userId = id user yang bakal dpt exp
// expGained = jumlah exp yang diterima/ditambahkan
async function addExp(userId, expGained){
    // ngecek user udh ada di users.json blm
    let users = {}

    // klo ada baca isinya dan ubah jdi format objek JS
    if (fs.existsSync(dataPath)){
        users = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } else{
        // klo blm ada di users.json kirim ini ke user secara privat
        const embed = new EmbedBuilder()
            .setColor(0xA56EFF)
            .setTitle("⚠️User terpantau blm daftar!⚠️")
            .setDescription("Eitts, kamu blm daftar😏! Gunakan `/start` untuk mendaftar!")
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }

    // ngambil data dri objek users[userId]
    let user = users[userId];

    // nambahin expGained ke total exp
    user.exp += expGained;

    // user.level dikali 50
    // contoh = user.level = 1, dikali 50 = 1*100 = 100,
    // contoh = user.level = 3, dikali 50 = 3*100 = 300, dst
    let levelTreshold = user.level * 100;
    // cek apa expnya bisa buat naik level apa kgk
    // klo expnya cukup buat naik level
    while (user.exp >= levelTreshold){
        // exp bakal dikurangin buat dipake naik level
        user.exp -= levelTreshold;
        // level user nambah satu
        // contoh = klo user.levelnya 5 + 1 = 6
        user.level += 1;
        // levelTresholdnya bakal ngeupdate gini terus
        levelTreshold = user.level * 100
    }

    // ngeupload ke users.json dengan data yang baru
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

    // ngembaliin data user, kyk name, level, serta exp (bisa dipake nanti pas waktu user mau liat stats dia)
    return user;
}

module.exports = {addExp};