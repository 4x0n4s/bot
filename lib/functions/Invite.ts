import { Snowflake, APIInvite} from 'discord-api-types/v10';
import { 
    Client, 
    User, 
    Guild
} from '@lib/index';
import Base from '@lib/functions/Base';

export class Invite extends Base {
    constructor(
        client: Client, 
        data: APIInvite
    ) {
        super();
        this.code = data.code;
        this.inviter = client.users.get(data.inviter?.id) ?? null;
        this.inviterID = this.inviter?.ID ?? null;
        this.target = data.target_user ? new User(client, data.target_user) : null;
        this.targetID = this.target?.ID ?? null;
        this.guild = client.guilds.get(data.guild?.id) ?? null;
        this.guildID = this.guild?.ID ?? null;
    }

    code: string;
    inviter: User | null;
    inviterID: Snowflake | null;
    target: User | null;
    targetID: Snowflake | null;
    guild: Guild | null;
    guildID: Snowflake | null;
}