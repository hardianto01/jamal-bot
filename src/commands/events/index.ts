import { EmbedBuilder, Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
import DragonNest from '../../lib/dnupdate'

export default {
    desc: 'update notice dragon nest sea',
    event: true,
    async execute(client: Message, { client: m }: Iextra) {
        const isNew = await m?.keyv.get('update-dn')
        const nest = new DragonNest()
        const result = await nest.getNotice()
        const i = result[0]
        const title = i.title.split('\n')[1].trim()
        const desc = i.title.split('\n')[2].trim()
        if (!isNew) return m?.keyv.set('update-dn', desc)
        if (isNew == desc) return
        const dates = i.title.split('\n')[3].trim()
        m?.keyv.set('update-dn', desc)
        const data = {
            url: i.url,
            client,
            title,
            desc,
            dates,
        }
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(data.title)
            .setDescription(data.desc)
            .setURL(data.url || '')
            .addFields([{ name: data.dates + ' ', value: 'Silahkan Cek Di Sini [Link](' + data.url + ')' }])
            .setFooter({
                text: 'Dragon Nest SEA',
                iconURL: 'https://e7.pngegg.com/pngimages/388/464/png-clipart-dragon-nest-logo-game-font-dragon-nest-m-legendary-creature-game.png',
            })
        m?.emit('update.pact', embed, client)
    },
}
