import { Message } from 'discord.js'
import { Iextra } from '../../typing/queue'
import { useQueue } from 'discord-player'

export default {
    command: ['skip', 'sk'],
    desc: 'untuk menskip lagu yang sedang di putar',
    async execute(interaction: Message, { player }: Iextra) {
        const skip = useQueue(interaction.guild?.id!)
        skip?.node.skip()
    },
}
