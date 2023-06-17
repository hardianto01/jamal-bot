import { Interaction } from 'discord.js'
import { Iextra } from './queue'

export type ICommands = {
    command: string[]
    category: string
    execute(interaction: Interaction, extra: Iextra): Promise<any>
}
