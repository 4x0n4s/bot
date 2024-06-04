import { ApplicationType } from '@typings';
import { APIApplication } from 'discord-api-types/v10';
import { Client, Team, User } from 'lib/index';

export default class Application implements ApplicationType {
    public readonly ID: string;
    public readonly owner: User | null;
    public readonly description: string;
    public readonly team: Team | null;
    public readonly isPublic: boolean;

    constructor(
        client: Client, 
        public data: APIApplication
    ) {
        this.ID = data.id;
        this.description = data.description;
        this.owner = data.owner ? new User(data.owner) : null;
        this.team = data.team ? new Team(client, data.team) : null;
        this.isPublic = data.bot_public;        
    }

    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(client: Client, data: APIApplication) {
        return new Application(client, data);
    }
}