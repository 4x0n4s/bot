import { APIMessage } from '@typings';
import { 
    type Client,
    User, 
    Guild, 
    Member
} from '@lib/index';
import { DiscordApiEndpoint } from '@lib/utils/Endpoints';
import { request } from 'undici';

export default class Message {
    constructor(private client: Client, data: any) {
        this.ID = data.id;
        this.content = data.content;
        this.channelID = data.channel_id;
        this.creator = new User(client, data.author);
        this.member = new Member(client, data.author);
        this.guild = client.guilds.get(data.guild_id) as Guild;
    }

    async send(content: string) {
        await request(DiscordApiEndpoint + `/channels/${this.channelID}/messages`, {
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

    ID: string;
    content: string | undefined;
    channelID: string | undefined;
    creator: User | undefined;
    member: Member | undefined;
    guild: Guild;
}