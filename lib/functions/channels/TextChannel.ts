import { KeyTypes } from '@typings';
import { APITextChannel } from 'discord-api-types/v10';
import { Channel, Client, Message, Storage, Guild } from 'lib/index';

export default class TextChannel extends Channel {
    public readonly ID: Snowflake;
    public readonly guild: Guild | null;
    public readonly lastMessageID: Snowflake | null;
    public readonly isNsfw: boolean;
    public readonly cooldown: number;
    public readonly messages: Storage<Message>;

    constructor(client: Client, data: APITextChannel) {
        super(data);
        this.ID = data.id;
        this.guild = client.guilds.get(data.guild_id) ?? null;
        this.lastMessageID = data.last_message_id ?? null;
        this.isNsfw = data.nsfw ?? false;
        this.cooldown = data.rate_limit_per_user ?? 0;
        this.messages = new Storage(client, `messages:${this.ID}`, TextChannel);
    }


    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(client: Client, data: APITextChannel) {
        return new TextChannel(client, data);
    }
}