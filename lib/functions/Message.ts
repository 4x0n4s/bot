import { 
    Channels, 
    Emoji, 
    StandardEmoji 
} from '@typings';
import { Endpoints } from 'lib/utilities/Constants';
import Base from 'lib/functions/Base';
import { 
    Client, 
    User, 
    Guild, 
    Member, 
    TextChannel
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
        this.reactions = this.client.rest.messages.getReactions(this);
    }
    
    ID: string;
    content: string | null;
    guild: Guild | null;
    creator: User | null;
    member: Member | null;
    channel: Channels;
    channelID: string | null;
    guildID: string | null;
    reactions: any;

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

    async reply(content: string) {
        await request(Endpoints.API + `/channels/${this.channelID}/messages`, {
            method: 'POST',
            body: JSON.stringify({
                content,
                message_reference: {
                    message_id: this.ID,
                    channel_id: this.channelID,
                    guild_id: this.guildID
                }
            }),
            headers: {
                'Authorization': `Bot ${this.client.token}`,
                'Content-Type': 'application/json'
            }
        });
    }

    addReactions(emojis: Emoji | Emoji[] | StandardEmoji | StandardEmoji[]) {
        if(!Array.isArray(emojis)) emojis = [emojis] as any[];
        this.client.rest.messages.addReactions(this, emojis);
    }
    removeReactions(emojis: Emoji[] | StandardEmoji[] | Emoji | StandardEmoji) {
        if(!Array.isArray(emojis)) emojis = [emojis] as any[];
        this.client.rest.messages.addReactions(this, emojis);
    }
}