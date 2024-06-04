import { URLFunction } from '@typings';
import { APITeam } from 'discord-api-types/v10';
import { Endpoints } from '@lib/utilities/Constants';
import { 
    Client,
    TeamMember 
} from '@lib/index';
import Base from '@lib/functions/Base';

export class Team extends Base {
    constructor(
        client: Client, 
        data: APITeam
    ) {
        super();
        this.ID = data.id;
        this.name = data.name;
        this.icon = data.icon;
        this.members = data.members.map(teamMember => new TeamMember(client, teamMember));
    }
    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/team-icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
    ID: Snowflake;
    name: string;
    icon: string | null;
    members: TeamMember[];
}