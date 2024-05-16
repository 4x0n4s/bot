import { Client } from 'lib/index';
import { Messages, Guilds, Users, Channels, Emojis } from 'lib/rest/routes/index';

export default class RESTManager {
    headers = {
        'Authorization': `Bot ${this.client.token}`,
        'Content-Type': 'application/json'
    }
    
    constructor(private client: Client) {
        this.messages = new Messages(client, this);
        this.guilds = new Guilds(client, this);
        this.users = new Users(client, this);
        this.channels = new Channels(client, this);
        this.emojis = new Emojis(client, this);
    }

    messages: Messages;
    guilds: Guilds;
    users: Users;
    channels: Channels;
    emojis: Emojis;
}