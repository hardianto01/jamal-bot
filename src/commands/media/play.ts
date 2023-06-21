import { Message, EmbedBuilder } from 'discord.js'
import { Iextra } from '../../typing/queue'

export default {
    command: ['play', 'p'],
    desc: 'memutar music dari spotify atau youtube',
    async execute(interaction: Message, { player, query }: Iextra) {
        const channel = interaction.member?.voice.channel
        if (!query) return interaction.reply('masukan query url/lagu')
        if (!channel)
            return interaction.reply('Maaf Kamu Tidak Terhubung Dalam Voice')
        try {
            const { track, extractor } = await player.play(channel, query, {
                nodeOptions: {
                    // nodeOptions are the options for guild node (aka your queue in simple word)
                    metadata: interaction, // we can access this metadata object using queue.metadata later on
                },
            })
            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099ff)
                .setTitle(track.title)
                .setURL(track.url)
                .setAuthor({
                    name: track.author,
                    iconURL: track.thumbnail,
                    url: track.url,
                })
                .setDescription(track.description)
                .setThumbnail(track.thumbnail)
                .addFields({ name: 'Duration', value: track.duration })
                .setTimestamp(track.durationMS)
                .setFooter({
                    text: 'Hardianto',
                    iconURL:
                        'https://cdn.discordapp.com/avatars/544457189478105099/a_69721df05e9bfb26034ceb46f3776cab.webp?size=128',
                })

            return interaction.reply({ embeds: [exampleEmbed] })
        } catch (e) {
            // let's return error if something failed
            return interaction.reply(`Something went wrong: ${e}`)
        }
    },
}
