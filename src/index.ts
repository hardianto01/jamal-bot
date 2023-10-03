import 'dotenv/config'
import * as fs from 'fs'
import path from 'path'
import { create } from './lib/client'
import connect from '../database/connect'
import { ICommands } from './typing/command'
import { Player, useMainPlayer } from 'discord-player/dist'
import { SpotifyExtractor } from '@discord-player/extractor'
import { EmbedBuilder, Events, GatewayIntentBits, Interaction } from 'discord.js'

export const commands = [] as ICommands[]
const token = process.env.TOKEN

const main = async () => {
    // connect to database
    await connect()

    // Create a new client instance
    const client = new create({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates],
    })

    const sound = useMainPlayer() || new Player(client)
    await sound.extractors.register(SpotifyExtractor, {})
    sound.events.on('playerStart', (queue, track) => {
        if (!queue.metadata) return
        (queue.metadata as any).channel.send(`Memutar Music **${track.title}**!`)
    })
    sound.events.on('emptyQueue', (queue) => {
        if (!queue.metadata) return
        (queue.metadata as any).channel.send(`Musik sudah habis!!`)
    })

    const commandsPath = path.join(__dirname, 'commands')
    const commandFiles = fs.readdirSync(commandsPath)

    for (const category of commandFiles) {
        const pathCategory = path.join(commandsPath, category)
        const dirCategory = fs.readdirSync(pathCategory).filter((file) => file.endsWith('.ts'))
        for (const file of dirCategory) {
            const filePath = path.join(pathCategory, file)
            const command = (await import(filePath)).default as ICommands

            command.category = pathCategory.split(/(\\|\/)/g).pop() || ''
            if (command.event || ('command' in command && 'execute' in command)) {
                commands.push(command)
                client.commands.set(command.command, command)
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
            }
        }
    }

    client.once('ready', (c) => {
        console.log(`Ready! Logged in as ${c.user.tag}`)
        setInterval(() => {
            const obj = commands.find((obj) => obj.event == true)
            client.guilds.cache.each(async function (x, i) {
                const valid = await client.keyv.get(x.channels.guild.id)
                if (valid) {
                    const channel = client.channels.cache.get(valid.channelId)
                    const webhooks = await channel?.fetch()

                    if (!webhooks) {
                        return console.log('No webhook was found that I can use!')
                    }
                    await obj?.execute(channel as any, { client })
                }
            })
        }, 3600000)
    })

    client.on('update.pact', (data) => {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(data.title)
            .setDescription(data.desc)
            .setURL(data.url || '')
            .addFields([{ name: data.dates + ' ', value: 'Silahkan Cek Di Sini [Link](' + data.url + ')' }])
            .setFooter({
                text: 'Dragon Nest SEA',
                iconURL: 'https://e7.pngegg.com/pngimages/388/464/png-clipart-dragon-nest-logo-game-font-dragon-nest-m-legendary-creature-game.png',
            })
        data.client.send({ embeds: [embed] })
    })

    client.on(Events.MessageCreate, async (m) => {
        let msg = client.transactionMessage(m)
        const body = m.content
        const prefix = '!'
        const isCommand = body.startsWith(prefix)
        if (!isCommand) return
        const prefixFixed = body.slice(prefix.length)
        const command = prefixFixed.split(' ')[0]
        const query = prefixFixed.replace(new RegExp(`^${command}\\s*`), '')
        const obj = commands.find((obj) => !obj.event && obj.command.find((s) => s.toLowerCase() == command.toLowerCase()))
        if (!obj) return
        if (query.includes('-help')) {
            m.reply({
                embeds: [new EmbedBuilder().setTitle(obj.desc)],
            })
            return
        }
        let extra = { client, player: sound, query, msg }
        obj.execute(m as unknown as Interaction, extra)
    })

    client.login(token)
}
main()
