import { Client, Collection, EmbedBuilder, Message } from 'discord.js'
import { Stg } from '../../database/stg'
import { IMessage } from '../typing/message'
import Keyv from 'keyv'
import 'dotenv/config'

const key = new Keyv(process.env.DATABASE_URL)

key.on('error', (err) => console.log('Connection Error', err))
export class create extends Client {
    commands = new Collection()
    sendMessageWithAuthor = async () => {
        const embed = new EmbedBuilder()
    }

    transactionMessage(messaga: Message<boolean>) {
        let attachment = messaga.attachments.toJSON()
        let isMedia = attachment.length > 0 ? (attachment[0].url ? true : false) : false
        let m: IMessage = {
            url: undefined,
            isMedia: false,
            type: null,
            content: '',
        }
        if (isMedia) {
            m = {
                url: attachment[0].url,
                isMedia: true,
                type: attachment[0].contentType,
                content: '',
            }
        }
        m.content = messaga.content
        return m
    }
    db = new Stg()
    keyv = key
}
