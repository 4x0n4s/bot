import { } from '@typings';
import { APITextChannel } from 'discord-api-types/v10';
import BaseChannel from 'lib/functions/BaseChannel';
import { 
    Client, 
    Message, 
    Storage, 
    Guild 
} from 'lib/index';

export default class TextChannel extends BaseChannel {
    constructor(private client: Client, data: APITextChannel) {
        super(data);
        this.guild = client.guilds.get(data.guild_id) ?? null;
        this.lastMessageID = data.last_message_id ?? null;
        this.isNsfw = data.nsfw ?? false;
        this.cooldown = data.rate_limit_per_user ?? 0;
    }

    guild: Guild | null;
    lastMessageID: string | null;
    isNsfw: boolean;
    cooldown: number;
    messages: Storage<string | null , Message> = new Storage();
}