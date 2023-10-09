import { Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
export default {
    command: ['gold'],
    desc: 'kalkulator dragon Nest!',
    async execute(client: Message, { query, client: conn }: Iextra) {
        if (!query) return client.reply('Masukan Jumlah Gold!!.')
        const ratee = await conn?.keyv.get('rate-gold')
        if (!ratee) return client.reply("rate belum terdaftar ke database")
        if (isNaN(Number(query))) return client.reply('Masukan Nominal Dengan Benar')
        const ratees = parseFloat(ratee) * 0.001
        const str1 = `
Nominal Gold: ${query}
Rate By: @${ratee}
Total Harga: \`Rp.${Number(query) * ratees}\``
        client.reply(str1)
    },
}
