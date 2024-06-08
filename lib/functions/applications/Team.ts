import { URLFunction } from '@typings';
import { APITeam } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { Client, TeamMember } from 'lib/index';

export default class Team {
    public readonly ID: Snowflake;
    public readonly name: string;
    public readonly icon: string | null;
    public members: TeamMember[];
    
    constructor(private data: APITeam) {
        this.ID = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.members = data.members.map(teamMember => new TeamMember(teamMember));
    }

    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/team-icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }

    toJSON() {
        return JSON.stringify(this.data);
    }
}