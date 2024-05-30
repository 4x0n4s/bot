import { APIMessage } from 'discord-api-types/v10';

export interface RawAPIMessage extends APIMessage {
    guild_id: string | null;
}