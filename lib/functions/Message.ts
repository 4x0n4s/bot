import { 
    Emoji,
    CreateMessageReplyOptionsData,
    StandardEmoji,
} from '@typings';
import { RawAPIMessage } from '@typings/raw';
import { Endpoints } from '@lib/utilities/Constants';
import {
    Client,
    User, 
    Guild, 
    Member, 
    TextChannel,
    Reaction,
} from '@lib/index';
import Base from '@lib/functions/Base';
import { request } from 'undici';

export class Message extends Base {
    private _client: Client;
    constructor(
        client: Client, 
        data: RawAPIMessage
    ) {
        super();
        this._client = client;
        this.ID = data.id;
        this.content = data.content;
        this.channelID = data.channel_id;
        this.guildID = data.guild_id;
        this.guild = client.guilds.get(data.guild_id) ?? null;
        this.creator = new User(client, data.author);
        this.member = this.guild?.members.get(data.author.id) ?? null;
        this.channel = new TextChannel(client, '' as any)
        this.reactions = data.reactions?.map(reaction => new Reaction(client, reaction)) ?? [];
    }

    async createReply(options: CreateMessageReplyOptionsData) {
        await this._client.rest.channels.createMessage(this, {
            ...options,
            messageReference: {
                guildID: this.guildID,
                channelID: this.channelID,
                messageID: this.ID                
            }
        });
    }

    async addReactions(emojis: Emoji | Emoji[] | StandardEmoji | StandardEmoji[]) {
        if(!Array.isArray(emojis)) emojis = [emojis] as Emoji[];
        return await this._client.rest.messages.addReactions(this, emojis);
    }
    
    async removeReactions(emojis: Emoji[] | StandardEmoji[] | Emoji | StandardEmoji) {
        if(!Array.isArray(emojis)) emojis = [emojis] as Emoji[];
        return await this._client.rest.messages.removeReactions(this, emojis);
    }

    ID: Snowflake;
    content: string | null;
    guild: Guild | null;
    creator: User | null;
    member: Member | null;
    channel: any;
    channelID: Snowflake | null;
    guildID: Snowflake | null;
    reactions: Reaction[];
}