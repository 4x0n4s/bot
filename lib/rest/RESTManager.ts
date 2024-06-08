import { Client } from 'lib/index';
import { Messages, Guilds, Users, Channels, Emojis, Members } from 'lib/rest/routes/index';

export default class RESTManager {
    headers;
    private token!: string;
    constructor(client: Client) {
        this.headers = {
            'Authorization': `Bot ${this.token}`,
            'Content-Type': 'application/json'
        }
        this.messages = new Messages(client);
        this.guilds = new Guilds(client);
        this.users = new Users(client);
        this.channels = new Channels(client);
        this.emojis = new Emojis(client);
        this.members = new Members(client);
    }

    setToken(token: string): void {
        this.token = token;
    }

    messages: Messages;
    guilds: Guilds;
    users: Users;
    channels: Channels;
    emojis: Emojis;
    members: Members;
}