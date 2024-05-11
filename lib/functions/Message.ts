import { APIMessage, Emoji, StandardEmoji } from '@typings';
import { Endpoints } from 'lib/utilities/Constants';
import { type Client, User, Guild, Member } from 'lib/index';
import { request } from 'undici';
import Reactions from './Reactions';

export default class Message {
    constructor(private client: Client, data: any) {
        this.ID = data.id;
        this.content = data.content;
        this.channelID = data.channel_id;
        this.guildID = data.guild_id;
        this.guild = client.guilds.get(data.guild_id) as Guild;
        this.creator = new User(client, data.author);
        this.member = new Member(client, data.author, this.guild);
        this._reactions = new Reactions(this.client, this);
        this.reactions = this._reactions.reactions();
    }
    
    private _reactions: Reactions;
    ID: string;
    content: string | null;
    guild: Guild;
    creator: User | null;
    member: Member | null;
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
        this._reactions.addReactions(emojis);
    }
    removeReactions(emojis: Emoji[] | StandardEmoji[] | Emoji | StandardEmoji) {
        if(!Array.isArray(emojis)) emojis = [emojis] as any[];
        this._reactions.addReactions(emojis);
    }
}