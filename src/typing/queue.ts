import { Player } from 'discord-player'
import { create } from '../lib/client'

export type Iextra = {
    client?: create
    player: Player 
    query?: string | undefined
}
