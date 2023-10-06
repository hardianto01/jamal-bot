import { EmbedBuilder, Message } from 'discord.js'
import DragonNest from '../../lib/dnupdate'

export default {
    command: ['pact'],
    desc: 'update notice dragon nest sea',
    async execute(client: Message) {
        const nest = new DragonNest()
        const result = await nest.pactUpdate()
        console.log(result)
            const embed = new EmbedBuilder()
                .setColor('#7FFF00')
                .setTitle(result.title)
                .setDescription(result.date)
                .setURL(result.url || '')
                const fields = Object.keys(result.new) 
                fields.forEach(function(x, i) {
                    embed
                    .addFields([{ name: x + ' ', value: 'Silahkan Cek [Cek Sini](' + result.new[x].url + ')' }])
                })
                embed
                .setFooter({
                    text: 'Dragon Nest SEA',
                    iconURL: 'https://e7.pngegg.com/pngimages/388/464/png-clipart-dragon-nest-logo-game-font-dragon-nest-m-legendary-creature-game.png',
                })
            client.reply({ embeds: [embed] })

        // Kirim pesan embed ke channel Discord
    },
}
