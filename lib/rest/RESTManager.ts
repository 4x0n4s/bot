import { Client } from 'lib/index';
import { Messages, Guilds, Users } from 'lib/routes/index';

export default class RESTManager {
    headers = {
        'Authorization': `Bot ${this.client.token}`,
        'Content-Type': 'application/json'
    }
    
    constructor(private client: Client) {
        this.messages = new Messages(client, this);
        this.guilds = new Guilds(client, this);
        this.users = new Users(client, this);
    }

    messages: Messages;
    guilds: Guilds;
    users: Users;
}