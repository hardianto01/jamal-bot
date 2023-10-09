import { Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
export default {
    command: ['setrate'],
    desc: 'kalkulator dragon Nest!',
    async execute(client: Message, { query, client: conn }: Iextra) {
        if (!query) return client.reply('Masukan Rate Gold!!.\nContoh: @490 E.g !setrate 490')
        const q = parseInt(query)
        await conn?.keyv.set('rate-gold', query)
        client.reply('Gold Berhasil Di Daftar Ke Database')
    },
}
