import { Interaction } from 'discord.js'
import { Iextra } from './queue'

export type ICommands = {
    command: string[]
    desc: string,
    category: string
    execute(interaction: Interaction, extra: Iextra): Promise<any>
}
