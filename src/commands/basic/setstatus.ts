import { ActivityType, Message } from 'discord.js'
import { Iextra } from '../../typing/queue'

export default {
    command: ['setstatus'],
    desc: 'cek ping bot',
    async execute(client: Message, { client: m, query}: Iextra) {
        m?.user?.setActivity(query || '', { type: ActivityType.Watching});
        m?.user?.setStatus('idle')
        m?.keyv.set('status', query)
    },
}
