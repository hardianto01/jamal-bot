import { Message } from "discord.js"

export default {
    command: ['ping', 'p'],
    async execute(client: Message) {
        await client.reply('Pong!')
    }
}
