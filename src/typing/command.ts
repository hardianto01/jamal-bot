import { Interaction } from 'discord.js'
import { Iextra } from './queue'

export type ICommands = {
    command: string[]
    desc: string
    category: string
    event?: boolean
    execute(interaction: Interaction, extra: Iextra): Promise<any>
}
