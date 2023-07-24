import { AttachmentBuilder, EmbedBuilder, Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
const petPetGif = require('pet-pet-gif')
export default {
    command: ['pet', 'pat'],
    desc: 'generator pat gif',
    async execute(interaction: Message, { msg }: Iextra) {
        if (!msg?.isMedia) return interaction.reply('Maaf Mebutuhkan Media Atau Gambar')
        let animatedGif = await petPetGif(msg.url, {
            resolution: 200,
            delay: 20,
        })
        const embed = new AttachmentBuilder(animatedGif, { name: 'petpet.gif' })
        interaction.reply({ files: [embed] })
    },
}
