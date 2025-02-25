// ngebuat perintah /help dri discord.js (diimport)
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

// ngeekspor command biar bisa dipake di file lain
module.exports = {
    // ngebuat command baru
    data: new SlashCommandBuilder()
        // nama commandnya /help
        .setName('help')
        // deskripsi commandnya di discord
        .setDescription(
            "Command yang tersedia untuk Lilith bot"
        ),
    // klo /help dipake ini jalan/bekerja
    async execute(interaction){
        // bot ngebales mke command ini
        try{
        const helpEmbed = new EmbedBuilder()
            .setColor(0xA56EFF)
            .setTitle('**📜List Command : 📜**')
            .setDescription('Command yang tersedia untuk Lilith bot : ')
            .addFields(
                {
                    name: "**Lilith Command<:Smile2:1342868138332655716>**",
                    value: "`/help` - Menampilkan list command \n"
                            + "`/info` - Menampilkan info bot \n",
                            inline: false
                },
                {
                    name: "**Game Command🕹️**",
                    value: "`/menu` - User menu game \n"
                            + "`/start` - Start game (Buat user baru) \n"
                            + "`/adventure` - Memulai adventure \n"
                            + "`/pvp` - Bertarung dengan user lain (Pet VS Pet)\n"
                            + "`/gachapet` - Gacha pet \n"
                            + "`/pet` - Pet kamu yang sudah tersedia \n",
                            inline: false
                }
            )
            .setFooter({text: "Pakai commandnya sesuai aturan server yak <:GiveEncouragement:1342867542351282237>"})

        await interaction.reply({embeds: [helpEmbed]});
    } catch (error){
        console.error('Error executing /help', error)

        if(interaction.replied || interaction.deferred){
            await interaction.followUp({content: 'Duh, ada yang error nih commandnya<:Sad2:1342828598544830587>!', ephemeral:true});
        } else{
            await interaction.reply({content: 'Duh, ada yang error nih commandnya<:Sad2:1342828598544830587>!', ephemeral:true});
        }
    }
},
};