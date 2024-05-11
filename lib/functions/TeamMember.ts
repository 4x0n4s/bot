import { APITeam, APITeamMember, TeamMemberRole } from 'discord-api-types/v10';
import { Client, User } from 'lib/index';

export default class TeamMember {
    constructor(private client: Client, data: APITeamMember) {
        this.user = new User(client, data.user);
        this.teamID = data.team_id;
        this.role = data.role.valueOf() as keyof typeof TeamMemberRole;
        this.isAccepted = data.membership_state.valueOf() === 2;
        this.isInvited = data.membership_state.valueOf() === 1; 
    }

    user: User;
    teamID: string;
    role: keyof typeof TeamMemberRole;
    isInvited: boolean;
    isAccepted: boolean;
}