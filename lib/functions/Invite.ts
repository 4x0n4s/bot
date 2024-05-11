import { APIEmoji, APIInvite, APIUser } from '@typings';
import { Client, User, Channel, Guild } from 'lib/index';

export default class Invite {
    constructor(private client: Client, data: APIInvite) {
        const users = this.client.users;
        this.code = data.code;
        this.inviter = users.get(data.inviter?.id) ?? null;
        this.inviterID = this.inviter?.ID ?? null;
        this.target = users.get(data.target_user?.id) ?? null;
        this.targetID = this.target?.ID ?? null;
        this.guild = client.guilds.get(data.guild?.id) ?? null;
        this.guildID = this.guild?.ID ?? null;
        this.channel = this.client.channels.get(data.channel?.id) ?? null;
        this.channelID = this.channel?.ID ?? null;
    }

    code: string;
    inviter: User | null;
    inviterID: User['ID'] | null;
    target: User | null;
    targetID: User['ID'] | null;
    guild: Guild | null;
    guildID: Guild['ID'] | null;
    channel: Channel | null;
    channelID: Channel['ID'] | null;
}