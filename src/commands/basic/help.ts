import { EmbedBuilder, Message } from 'discord.js'
import path from 'path'
import * as fs from 'fs'
import { Iextra } from '../../typing/queue'
import { commands } from '../..'
const __path = process.cwd()

let prefix = '!'

export default {
    command: ['help', 'menu'],
    desc: 'menampilkan menu yang tersedia',
    async execute(message: Message, {}: Iextra) {
        const categoryPath = path.join(__path, 'src', 'commands')
        const categorys = fs.readdirSync(categoryPath)

        const embed = new EmbedBuilder()
        for (const category of categorys) {
            let menu = ``
            for (const cmd of commands) {
                if (category == cmd.category)
                    menu += prefix + cmd.command[0] + '\n'
            }
            menu += '\n\n\n'
            embed.addFields({
                name: category,
                value: menu,
            })
        }
        embed.addFields({
            name: 'note: ',
            value: 'untuk melihat deskripsi setiap perintah tambah kan perintah -help',
            inline: true,
        })
        message.reply({ embeds: [embed] })
    },
}
