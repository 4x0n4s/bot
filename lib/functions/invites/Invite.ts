import { APIInvite } from 'discord-api-types/v10';
import { Client, User, Guild } from 'lib/index';

export default class Invite {
    public readonly code: string;
    public readonly inviter: User | null;
    public readonly inviterID: Snowflake | null;
    public readonly target: User | null;
    public readonly targetID: Snowflake | null;
    public readonly guild: Guild | null;
    public readonly guildID: Snowflake | null;

    constructor(
        client: Client, 
        private data: APIInvite
    ) {
        let guildData = client.guilds.get(data.guild?.id as string)[0];
        this.code = data.code;
        this.inviter = data.inviter ? new User(data.inviter) : null;
        this.inviterID = this.inviter?.ID ?? null;
        this.target = data.target_user ? new User(data.target_user) : null;
        this.targetID = this.target?.ID ?? null; 
        this.guild = guildData ? new Guild(client, guildData) : null;
        this.guildID = this.guild?.ID ?? data.guild?.id ?? null;
    }

    toJSON() {
        return JSON.stringify(this.data);
    }

}