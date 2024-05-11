import { URLFunction } from '@typings';
import { APITeam, APITeamMember } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import { Client, TeamMember, User } from 'lib/index';

export default class Team {
    constructor(private client: Client, data: APITeam) {
        this.ID = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.members = data.members.map(teamMember => new TeamMember(client, teamMember));
    }

    ID: string;
    name: string;
    icon: string | null;
    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/team-icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
    members: TeamMember[];
}