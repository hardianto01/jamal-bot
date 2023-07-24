import { Player } from 'discord-player'
import { create } from '../lib/client'
import { IMessage } from './message'

export type Iextra = {
    client?: create
    player: Player
    query?: string | undefined
    msg?: IMessage
}
