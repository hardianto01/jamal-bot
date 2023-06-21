import { Client, Collection, EmbedBuilder } from 'discord.js'
import { Stg } from '../../database/stg'

export class create extends Client {
    commands = new Collection()
    sendMessageWithAuthor = async () => {
        const embed = new EmbedBuilder()
    }
    db = new Stg()
}
