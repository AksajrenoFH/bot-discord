// ngebuat perintah /start dri discord.js (diimport)
const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { data, execute } = require('./adventure');

module.exports = {
    data: new SlashCommandBuilder()
    // nama commandnya /adventure
    .setName('adventure')
    // deskripsi commandnya di discord
    .setDescription(
        "Ayo mulai berpetualang!"
    ),

    // klo /adventure dijalanin, kode disini bakal kerja/jalan
    async execute(interaction){
        // ngambil probilitas 80% bakal ketemu monster
        const monsterEncounter = Math.random() < 0.8;

        // klo ketemu monster, bakal nyari monster random
        if(monsterEncounter){
            // rarity monsternya keluar
            const monsterRarity = [
                {rarity: 'Common', chance: 0.5}, // 50% keluar monster common
                {rarity: 'Elite', chance: 0.25}, // 25% keluar monster elite
                {rarity: 'Epic', chance: 0.15}, // 15% keluar monster epic
                {rarity: 'Legendary', chance: 0.07}, // 7% keluar monster legendary
                {rarity: 'Mythic', chance: 0.029}, // 2.9% keluar monster mythic
                {rarity: 'Aurora', chance: 0.001}, // 0.1% keluar monster aurora
            ]

            // nentuin raritynya sesuai problabibliblalbalba pokoknya gitu dah
            let randomMonster = Math.random();
            // rarity default klo gk ada yg cocok
            let defaultRarity = 'Common';

            // klo monster kurang dari kelangkaan tertentu, mka dia yang bakal dipilih
            for(let rarity of monsterRarity){
                if (randomMonster < rarity.chance){
                    defaultRarity = rarity.rarity;
                    break;
                }
                randomMonster -= rarity.chance
            }

            // daftar monster berdasar kelangkaan
            const monsterRarityList = {
                Common: [
                    {name: 'Goblin', hp: 300},
                    {name: 'Skeleton', hp: 300},
                    {name: 'Undead', hp: 300},
                    {name: 'Spider', hp: 300},
                    {name: 'Slime', hp: 300},
                    {name: 'Cyclops', hp: 300},
                    {name: 'Troll', hp: 300},
                ],
                Elite: [
                    {name: 'Orc', hp: 650},
                    {name: 'Wolf', hp: 650},
                    {name: 'Reptilian', hp: 650},
                    {name: 'Ogre', hp: 650},
                    {name: 'Golem', hp: 650},
                    {name: 'Yeti', hp: 650},
                    {name: 'Minotaur', hp: 650},
                ],
                Epic: [
                    {name: 'Wendigo', hp: 1200},
                    {name: 'Ifrit', hp: 1200},
                    {name: 'Siren', hp: 1200},
                    {name: 'Lich', hp: 1200},
                    {name: 'Kelpie', hp: 1200},
                    {name: 'Cerberus', hp: 1200},
                    {name: 'Manticore', hp: 1200},
                ],
                Legendary: [
                    {name: 'Dragon', hp: 2100},
                    {name: 'Demon', hp: 2100},
                    {name: 'Kraken', hp: 2100},
                    {name: 'Phoenix', hp: 2100},
                    {name: 'Oni', hp: 2100},
                    {name: 'Shadow', hp: 2100},
                    {name: 'Trant', hp: 2100},
                ],
                Mythic: [
                    {name: 'Hydra', hp: 3050},
                    {name: 'Skylla', hp: 3050},
                    {name: 'Leviathan', hp: 3050},
                    {name: 'Behemoth', hp: 3050},
                    {name: 'Fenrir', hp: 3050},
                    {name: 'Archon', hp: 3050},
                    {name: 'Jörmungandr', hp: 3050},
                ],
                Aurora: [
                    {name: 'DDred', hp: 4975},
                    {name: 'Nyx', hp: 6700},
                    {name: 'Yggdrasil', hp: 8080},
                    {name: 'Azatoth', hp: 10150},
                    {name: 'Ouroboros', hp: 12705},
                ]
            }

            // milih monster secara acak dri rarity yang udh didapat
            const monster = monsterRarityList[defaultRarity];
            const selectedMonster = monster[Math.floor(Math.random() * monster.length)];

            // pesan yang bakal muncul klo nemu monster
            const embed = new EmbedBuilder()
                .setTitle("👺KAMU TELAH BERTEMU DENGAN MONSTER!👺")
                .setDescription(`Kamu bertemu dengan monster bernama **${selectedMonster.name}**! Waspadalah`)
                .setColor(0xA56EFF)
                .addFields(
                    {name: 'Rarity✨', value: defaultRarity, inline: true},
                    {name: 'HP❤️', value: selectedMonster.hp.toString(), inline:true}
                )

            await interaction.reply({
                embeds: [embed]
            });
            
        } 
        // klo gk nemu pesan ini bakal muncul
        else{

            const embedNothing = new EmbedBuilder()
                .setTitle("🍃Kamu tidak menemukan monster satupun dalam perjalanan ini🍃")
                .setColor(0xA56EFF)

            await interaction.reply({
                embeds: [embedNothing]
            })
        }
    }
}