// ngebuat perintah /info dri discord.js (diimport)
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

// ngeekspor command biar bisa dipake di file lain
module.exports = {
    // ngebuat command baru
    data: new SlashCommandBuilder()
        // nama commandnya /info
        .setName('info')
        // deskripsi commandnya di discord
        .setDescription(
            "Info bot Lilith"
        ),
    // klo /info dipake ini jalan/bekerja
    async execute(interaction){
        // bot ngebales mke command ini
        try{
        const infoEmbed = new EmbedBuilder()
            .setColor(0xA56EFF)
            .setTitle('**📋About Me : 📋**')
            .setDescription("Deskripsi Lilith")
            .setImage('https://i.imgur.com/I57Q1xT.jpeg')
            .addFields(
                {
                    name: "**Lilith Bot**",
                    value: "**Tipe** : Bot Interaksi \n"
                            + "**Fitur** : \n - 🎮 Game Mode \n - 🎰 Gacha System \n - ⚔️ PVP \n"
                            + "**Developer** : Some1 \n"
                            + "**Bahasa Pemrograman** : Node.js \n"
                            + "**Bahasa yang didukung** : Indonesia \n"
                            + "**Versi** : v1.1",
                            inline: false
                }
            )

        await interaction.reply({embeds: [infoEmbed]});
    } catch (error){
        console.error('Error executing /info', error)

        if(interaction.replied || interaction.deferred){
            await interaction.followUp({content: 'Duh, ada yang error nih commandnya<:Sad2:1342828598544830587>!', ephemeral:true});
        } else{
            await interaction.reply({content: 'Duh, ada yang error nih commandnya<:Sad2:1342828598544830587>!', ephemeral:true});
        }
    }
},
};