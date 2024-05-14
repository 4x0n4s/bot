import { Channels } from '@typings';
import { APIInvite } from 'discord-api-types/v10';
import Base from 'lib/functions/Base';
import { 
    Client, 
    User, 
    Guild
} from 'lib/index';

export default class Invite extends Base {
    constructor(private client: Client, data: APIInvite) {
        super();
        const users = client.users;
        this.code = data.code;
        this.inviter = users.get(data.inviter?.id) ?? null;
        this.inviterID = this.inviter?.ID ?? null;
        this.target = users.get(data.target_user?.id) ?? null;
        this.targetID = this.target?.ID ?? null;
        this.guild = client.guilds.get(data.guild?.id) ?? null;
        this.guildID = this.guild?.ID ?? null;
        this.channel = client.channels.get(data.channel?.id) ?? null;
        this.channelID = this.channel?.ID ?? null;
    }

    code: string;
    inviter: User | null;
    inviterID: User['ID'] | null;
    target: User | null;
    targetID: User['ID'] | null;
    guild: Guild | null;
    guildID: Guild['ID'] | null;
    channel: Channels | null;
    channelID: Channels['ID'] | null;
}