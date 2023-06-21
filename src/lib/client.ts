import { Client, Collection, EmbedBuilder } from 'discord.js'

export class create extends Client {
    commands = new Collection()
    sendMessageWithAuthor = async () => {
        const embed = new EmbedBuilder()
    }
}
