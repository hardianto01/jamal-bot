import { AttachmentBuilder, EmbedBuilder, Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
import axios from 'axios'
export default {
    command: ['meme', 'memegen'],
    desc: 'membuat meme custom anda sendiri',
    async execute(interaction: Message, { msg, query }: Iextra) {
        if (!msg?.isMedia) return interaction.reply('Maaf Mebutuhkan Media Atau Gambar')
        if (!query) return interaction.reply('Membutuhkan Text Untuk Membuat Meme yang di perlukan')
        const text = query.split('|')

        let hight = text[0]
        let width = text[1]
        if (!width) {
            width = hight
            hight = '_'
        }
        let { data } = await axios.get(`https://api.memegen.link/images/custom/${hight}/${width}.${msg.type?.split('/')[1]}?background=${msg.url}`, {
            responseType: 'arraybuffer',
        })
        const embed = new AttachmentBuilder(data, { name: 'petpet.gif' })
        interaction.reply({ files: [embed] })
    },
}
