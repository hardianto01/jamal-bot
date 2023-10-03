import { Message } from 'discord.js'
import { Iextra } from '../../typing/queue'

export default {
    command: ['setnotice'],
    desc: 'menambahkan server untuk otomatisasi update web dn',
    async execute(message: Message, { client }: Iextra) {
        const guildId = message.guild?.id
        if (!guildId) return message.reply('hanya untuk di server')
        await client?.keyv.set(guildId, {
            channelId: message.channel.id,
            message: 'Ini adalah pesan otomatis dari bot.',
        })
        message.reply('Berhasil Menyetel. Pesan Otomatis Akan Di Kirim!!')
    },
}
