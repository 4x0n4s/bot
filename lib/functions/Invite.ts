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
        const users = client.users;
        this.code = data.code;
        this.inviter = users.get(data.inviter?.id) ?? null;
        this.inviterID = this.inviter?.ID ?? null;
        this.target = users.get(data.target_user?.id) ?? null;
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