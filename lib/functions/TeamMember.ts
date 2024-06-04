import { 
    APITeamMember, 
    TeamMemberRole 
} from 'discord-api-types/v10';
import {
    Client,
    User 
} from '@lib/index';
import Base from '@lib/functions/Base';

export class TeamMember extends Base {
    constructor(
        client: Client, 
        data: APITeamMember
    ) {
        super();
        this.user = new User(client, data.user);
        this.teamID = data.team_id;
        this.role = data.role;
        this.isAccepted = data.membership_state === 2;
        this.isInvited = data.membership_state === 1; 
    }
    
    user: User;
    teamID: Snowflake;
    role: TeamMemberRole;
    isInvited: boolean;
    isAccepted: boolean;
}