import { APITeamMember, TeamMemberRole } from 'discord-api-types/v10';
import { Client, User } from 'lib/index';

export default class TeamMember {
    public readonly user: User | null;
    public readonly teamID: Snowflake;
    public readonly role: TeamMemberRole;
    public readonly isInvited: boolean;
    public readonly isAccepted: boolean;

    constructor(data: APITeamMember) {
        this.user = data.user ? new User(data.user) : null;
        this.teamID = data.team_id;
        this.role = data.role;
        this.isAccepted = data.membership_state === 2;
        this.isInvited = data.membership_state === 1; 
    }

    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(data: APITeamMember) {
        return new TeamMember(data);
    }
}