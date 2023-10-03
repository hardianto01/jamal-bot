import { EmbedBuilder, Message } from 'discord.js'
import DragonNest from '../../lib/dnupdate'

export default {
    command: ['notice'],
    desc: 'update notice dragon nest sea',
    async execute(client: Message) {
        const nest = new DragonNest()
        const result = await nest.getNotice()
        result.forEach((i, el) => {
            const title = i.title.split('\n')[1].trim()
            const desc = i.title.split('\n')[2].trim()
            const dates = i.title.split('\n')[3].trim()
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(title)
                .setDescription(desc)
                .setURL(i.url || '')
                .addFields([{ name: dates + ' ', value: 'Silahkan Cek Di Sini [Link](' + i.url + ')' }])
                .setFooter({
                    text: 'Dragon Nest SEA',
                    iconURL: 'https://e7.pngegg.com/pngimages/388/464/png-clipart-dragon-nest-logo-game-font-dragon-nest-m-legendary-creature-game.png',
                })
            client.reply({ embeds: [embed] })
        })

        // Kirim pesan embed ke channel Discord
    },
}
