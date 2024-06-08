import { Emoji, CreateMessageReplyOptionsData, StandardEmoji,} from '@typings';
import { RawAPIMessage } from '@typings/raw';
import { Client, User, Guild, Member, TextChannel, Reaction } from 'lib/index';

export default class Message {
    private _client: Client;
    public readonly ID: Snowflake;
    public readonly content: string | null;
    public readonly guild: Guild | null;
    public readonly creator: User | null;
    public readonly member: Member | null;
    public readonly channel: any;
    public readonly channelID: Snowflake | null;
    public readonly guildID: Snowflake | null;
    public readonly reactions: Reaction[];
    
    constructor(
        client: Client, 
        public data: RawAPIMessage
    ) {
        this._client = client;
        this.ID = data.id;
        this.content = data.content;
        this.channel = new TextChannel(client, '' as any);
        this.channelID = data.channel_id;
        this.creator = new User(data.author);
        this.guildID = data.guild_id;
        let guildData = client.guilds.get(data.guild_id as string)[0];
        this.guild = guildData ? new Guild(client, guildData) : null;
        let memberData = this.guild?.members.get(this.creator.ID)[0];
        this.member = memberData ? new Member(memberData) : null;
        this.reactions = data.reactions?.map(reaction => new Reaction(reaction)) ?? [];
    }
    
    async addReactions(emojis: Emoji | Emoji[] | StandardEmoji | StandardEmoji[]) {
        if(!Array.isArray(emojis)) emojis = [emojis] as Emoji[];
        return await this._client.rest.messages.addReactions(this, emojis);
    }
    
    async removeReactions(emojis: Emoji[] | StandardEmoji[] | Emoji | StandardEmoji) {
        if(!Array.isArray(emojis)) emojis = [emojis] as Emoji[];
        return await this._client.rest.messages.removeReactions(this, emojis);
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

    toJSON() {
        return JSON.stringify({
            ID: this.ID,
            content: this.content,
            guild: this.guild?.toJSON(),
            creator: this.creator?.toJSON(),
            member: this.member?.toJSON(),
            channel: this.channel.toJSON(),
            channelID: this.channelID,
            guildID: this.guildID,
            reactions: JSON.stringify(this.reactions.map(reaction => reaction.toJSON()))
        });
    }
}