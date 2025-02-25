// ngebuat perintah /start dri discord.js (diimport)
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const fs = require('fs');
const { console } = require('inspector');
// path = mengelelola file dengan aman
const path = require('path');

// nentuin file users.json buat nyimpen data user
const dataPath = path.join(__dirname, "../users.json");

// userId = id user yang bakal dpt exp
// expGained = jumlah exp yang diterima/ditambahkan
async function addExp(userId, expGained, interaction){
    // ngecek user udh ada di users.json blm
    let users = {}

    // klo ada baca isinya dan ubah jdi format objek JS
    // sekalian ngecek JSON ada dan gk kosong
    if (fs.existsSync(dataPath)){
        try{
            const fileData = fs.readFileSync(dataPath, 'utf-8').trim();
            if (fileData !== ""){
                users = JSON.parse(fileData)
            }
        } catch(error){
            console.error("❌ Error membaca users.json:", error);
            users = {};
        }
    };

    //  && fs.readFileSync(dataPath, 'utf-8').trim() !== ""//
    
    if (!users[userId]){
        const embed = new EmbedBuilder()
            .setColor(0xA56EFF)
            .setTitle("⚠️ User belum terdaftar! ⚠️")
            .setDescription("Eitts, kamu belum daftar 😏! Gunakan `/start` untuk mendaftar!")

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
        // keluar dari fungsinya
        return null
    };

    // ngambil data dri objek users[userId]
    let user = users[userId];

    // nambahin expGained ke total exp
    user.exp += expGained;

    // user.level dikali 50
    // contoh = user.level = 1, dikali 50 = 1*100 = 100,
    // contoh = user.level = 3, dikali 50 = 3*100 = 300, dst
    let levelThreshold = user.level * 100;
    // cek apa expnya bisa buat naik level apa kgk
    // klo expnya cukup buat naik level
    while (user.exp >= levelThreshold){
        // exp bakal dikurangin buat dipake naik level
        user.exp -= levelThreshold;
        // level user nambah satu
        // contoh = klo user.levelnya 5 + 1 = 6
        user.level += 1;
        // levelThresholdnya bakal ngeupdate gini terus
        levelThreshold = user.level * 100
    }

    // ngeupload ke users.json dengan data yang baru
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));

    // ngembaliin data user, kyk name, level, serta exp (bisa dipake nanti pas waktu user mau liat stats dia)
    return user;
}

module.exports = {addExp};