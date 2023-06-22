// Require the necessary discord.js classes
import { EmbedBuilder, Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'
import connect from '../database/connect'
import * as fs from 'fs'
import path from 'path'
import { create } from './lib/client'
import { ICommands } from './typing/command'
import { Player } from 'discord-player'
import { SpotifyExtractor } from '@discord-player/extractor'
// import { registerCommands } from './register.command'

export const commands = [] as ICommands[]

const token = process.env.TOKEN
const main = async () => {

    // connect to database
    await connect()
    // Create a new client instance
    const client = new create({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildVoiceStates,
        ],
    })
    const sound = new Player(client)
    await sound.extractors.loadDefault()

    // If you dont want to use all of the extractors and register only the required ones manually, use
    await sound.extractors.register(SpotifyExtractor, {})
    
    sound.events.on('playerStart', (queue, track) => {
        if (!queue.metadata) return
        ;(queue.metadata as any).channel.send(
            `Memutar Music **${track.title}**!`
        )
    })
    sound.events.on('emptyQueue', (queue) => {
        if (!queue.metadata) return
        ;(queue.metadata as any).channel.send(`Musik sudah habis!!`)
    })
    client.once('ready', (c) => {
        console.log(`Ready! Logged in as ${c.user.tag}`)
    })
    const commandsPath = path.join(__dirname, 'commands')
    const commandFiles = fs.readdirSync(commandsPath)

    for (const category of commandFiles) {
        const pathCategory = path.join(commandsPath, category)
        const dirCategory = fs
            .readdirSync(pathCategory)
            .filter((file) => file.endsWith('.ts'))
        for (const file of dirCategory) {
            const filePath = path.join(pathCategory, file)
            const command = (await import(filePath)).default as ICommands

            command.category = pathCategory.split(/(\\|\/)/g).pop() || ''
            if ('command' in command && 'execute' in command) {
                commands.push(command)
                client.commands.set(command.command, command)
            } else {
                console.log(
                    `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
                )
            }
        }
    }

    client.on(Events.MessageCreate, async (m) => {
        const body = m.content
        const prefix = '!'
        const isCommand = body.startsWith(prefix)
        if (!isCommand) return
        const prefixFixed = body.slice(prefix.length)
        const command = prefixFixed.split(' ')[0]
        const query = prefixFixed.replace(new RegExp(`^${command}\\s*`), '')
        const obj = commands.find((obj) =>
            obj.command.find((s) => s.toLowerCase() == command.toLowerCase())
        )
        if (!obj) return
        if (query.includes('-help')) {
            m.reply({
                embeds: [new EmbedBuilder().setTitle(obj.desc)],
            })
            return
        }
        let extra = { client, player: sound, query }
        obj.execute(m as any, extra)
    })
    // Log in to Discord with your client's token
    client.login(token)
    // registerCommands(commands)
}
main()
