import { KeyTypes } from '@typings';
import { APITextChannel } from 'discord-api-types/v10';
import BaseChannel from '@lib/functions/BaseChannel';
import { 
    Client, 
    Message, 
    Storage, 
    Guild 
} from '@lib/index';

export class TextChannel extends BaseChannel {
    constructor(
        client: Client, 
        data: APITextChannel
    ) {
        super(data);
        this.ID = data.id;
        this.guild = client.guilds.get(data.guild_id) ?? null;
        this.lastMessageID = data.last_message_id ?? null;
        this.isNsfw = data.nsfw ?? false;
        this.cooldown = data.rate_limit_per_user ?? 0;
        this.messages = new Storage();
    }
    ID: Snowflake;
    guild: Guild | null;
    lastMessageID: Snowflake | null;
    isNsfw: boolean;
    cooldown: number;
    messages: Storage<KeyTypes, Message>;
}