import { Message, EmbedBuilder } from 'discord.js'
import { Iextra } from '../../typing/queue'

export default {
    command: ['stop', 's'],
    desc: 'menghentikan semua musik',
    async execute(interaction: Message, { player }: Iextra) {
        if (!player) return
        const exampleEmbed = new EmbedBuilder().setColor(0x0099ff).setTitle('Mematikan Music').setDescription('Terimah Kasih Sudah Menggunakan').setFooter({
            text: 'Hardianto',
            iconURL: 'https://cdn.discordapp.com/avatars/544457189478105099/a_69721df05e9bfb26034ceb46f3776cab.webp?size=128',
        })
        await player.destroy()
        return interaction.reply({ embeds: [exampleEmbed] })
    },
}
