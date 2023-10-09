import { Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
export default {
    command: ['buy'],
    desc: 'kalkulator dragon Nest!',
    async execute(client: Message, { query, client: conn }: Iextra) {
        if (!query) return client.reply('Masukan Jumlah Uang!!.')
        const rat = await conn?.keyv.get('rate-gold')
        if (!rat) return client.reply('Rate Belum Terdaftar')
        if (isNaN(Number(query))) return client.reply('Masukan Nominal Dengan Benar')
        const rates = parseFloat(rat) * 0.001
        const gold = Number(query) / rates
        const str = `
Harga Gold: Rp.${query}
Rate By: @${rat}
Jumlah Gold: \`${Math.floor(gold)}\``
        client.reply(str)
    },
}
