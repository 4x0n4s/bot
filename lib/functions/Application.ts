import { ApplicationType } from '@typings';
import { APIApplication } from 'discord-api-types/v10';
import { 
    Client, 
    Team, 
    User 
} from '@lib/index';
import Base from '@lib/functions/Base';

export class Application extends Base implements ApplicationType {
    constructor(
        client: Client, 
        data: APIApplication
    ) {
        super();
        this.ID = data.id;
        this.description = data.description;
        this.owner = data.owner ? new User(client, data.owner) : null;
        this.team = data.team ? new Team(client, data.team) : null;
        this.isPublic = data.bot_public;        
    }

    ID: string;
    owner: User | null;
    description: string;
    team: Team | null;
    isPublic: boolean;
}