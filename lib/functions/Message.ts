import { 
    Emoji,
    CreateMessageReplyOptionsData,
    StandardEmoji,
    KeyTypes
} from '@typings';
import { APIReaction } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import Base from 'lib/functions/Base';
import { 
    Client,
    Storage,
    User, 
    Guild, 
    Member, 
    TextChannel,
    Reaction,
    
} from 'lib/index';
import { request } from 'undici';

export default class Message extends Base {
    constructor(private client: Client, data: any) {
        super();
        const guild = client.guilds.get(data.guild_id);
        this.ID = data.id;
        this.content = data.content;
        this.channelID = data.channel_id;
        this.guildID = data.guild_id;
        this.guild = guild ?? null;
        this.creator = new User(client, data.author);
        this.member = guild?.members.get(data.author.id) ?? null;
        this.channel = new TextChannel(client, '' as any)
        this.reactions = new Storage(data.reactions?.map((reaction: APIReaction) => [reaction.emoji, new Reaction(client, reaction)]));
    }
    
    ID: string;
    content: string | null;
    guild: Guild | null;
    creator: User | null;
    member: Member | null;
    channel: any;
    channelID: string | null;
    guildID: string | null;
    reactions: Storage<KeyTypes, Reaction>;

    async send(content: string) {
        await request(Endpoints.API + `/channels/${this.channelID}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                content,
            }),
            headers: {
                'Authorization': `Bot ${this.client.token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    async createReply(options: CreateMessageReplyOptionsData) {
        await this.client.rest.channels.createMessage(this, {
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
        await this.client.rest.messages.addReactions(this, emojis);
    }
    async removeReactions(emojis: Emoji[] | StandardEmoji[] | Emoji | StandardEmoji) {
        if(!Array.isArray(emojis)) emojis = [emojis] as Emoji[];
        await this.client.rest.messages.addReactions(this, emojis);
    }
}