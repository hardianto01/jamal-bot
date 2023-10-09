import { Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
export default {
    command: ['rate'],
    desc: 'kalkulator dragon Nest!',
    async execute(client: Message, { query, client: conn }: Iextra) {
        const rate = await conn?.keyv.get('rate-gold')
        if (!rate) return client.reply('Maaf rate Gold Belum Di Setel')
        client.reply(`Rate Gold Saat Ini: \`@${rate}\``)
    },
}
