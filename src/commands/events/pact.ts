import { EmbedBuilder, Message } from 'discord.js'
import DragonNest from '../../lib/dnupdate'
import { Iextra } from '../../typing/queue'

export default {
    desc: 'update pact dragon nest sea',
    event: true,
    async execute(client: Message, { client: user }: Iextra
        ) {
        const nest = new DragonNest()
        const result = await nest.pactUpdate()
        const key = await user?.keyv.get('update.pact')
        if (!key) return user?.keyv.set('update.pact', result.title)
        if (result.title == key) return
        user?.keyv.set('update.pact', result.title)
        const embed = new EmbedBuilder()
            .setColor('#7FFF00')
            .setTitle(result.title)
            .setDescription(result.date)
            .setURL(result.url || '')
        const fields = Object.keys(result.new)
        fields.forEach(function (x, i) {
            embed.addFields([{ name: x + ' ', value: 'Silahkan Cek [Cek Sini](' + result.new[x].url + ')' }])
        })
        embed.setFooter({
            text: 'Dragon Nest SEA',
            iconURL: 'https://e7.pngegg.com/pngimages/388/464/png-clipart-dragon-nest-logo-game-font-dragon-nest-m-legendary-creature-game.png',
        })

       user?.emit('update.pact', embed, client)
        // Kirim pesan embed ke channel Discord
    },
}
