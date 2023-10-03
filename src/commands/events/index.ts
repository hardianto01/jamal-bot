import { EmbedBuilder, Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
import DragonNest from '../../lib/dnupdate'

export default {
    desc: 'update notice dragon nest sea',
    event: true,
    async execute(client: Message, { client: m }: Iextra) {
        const isNew = await m?.keyv.get('update-dn')
        const nest = new DragonNest()
        console.log(isNew)
        const result = await nest.getNotice()
        const i = result[0]
        const title = i.title.split('\n')[1].trim()
        const desc = i.title.split('\n')[2].trim()
        if (!isNew) return m?.keyv.set('update-dn', desc)
        if (isNew == desc) return
        const dates = i.title.split('\n')[3].trim()
        m?.keyv.set('update-dn', desc)
        const json = {
            url: i.url,
            client,
            title,
            desc,
            dates,
        }
        m?.emit('update.pact', json)
    },
}
