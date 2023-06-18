import { Message } from "discord.js"

export default {
    command: ['ping'],
    desc: 'cek ping bot',
    async execute(client: Message) {
        await client.reply('Pong!')
    }
}
