import { 
    KeyTypes,
    ClientSettings,
    Events,
    BasicCacheFunctions,
    ClientType
} from '@typings';
import { Endpoints } from 'lib/Constants';
import RESTManager from 'lib/rest/RESTManager';
import { WebSocket } from "lib/gateway/ws/index";
import { Storage, ClientUser, User, Guild, Member, Message, TextChannel } from 'lib/index';
import EventEmitter from 'events';
import { request } from 'undici';
import { APIUser } from 'discord-api-types/v10';

export class Client extends EventEmitter implements ClientType {
    private _ws: WebSocket = new WebSocket(this);
    private _user!: ClientUser;
    rest!: RESTManager;
    token!: string | null;
    isReady: boolean = false;
    guilds: Storage<Guild>;
    users: Storage<User>;
    channels: Storage<any>;
    cache!: BasicCacheFunctions;

    constructor(public settings: ClientSettings) {
        super();
        this.guilds = new Storage(this, 'guilds', Guild);
        this.users = new Storage(this, 'guilds', Guild);
        this.channels = new Storage(this, 'guilds', Guild);
    }

    connect(token?: string) {
        token = this.settings?.token ? this.settings.token : token;
        this.token = token ?? null;

        if (token && typeof token === 'string') {
            this._ws.connect(token);
            this.rest = new RESTManager(this);
            return;
        } else {
            //Error
        }
    }

    on<Event extends keyof Events>(
        event: Event,
        listener: (...args: Events[Event]) => void,
    ): this {
        super.on(event, listener);
        return this;
    }

    get ws() {
        return this._ws;
    }

    set user(user: ClientUser) {
        this._user = user;
    }

    get user() {
        return this._user;
    }

    async fetchUsers() {
        const { body } = await request(Endpoints.API + '/users/@me/users/', {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const users = await body.json() as any[];
        for (const user of users) {
            let u: any = await request(Endpoints.API + `/users/${user.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bot ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            u = await u.body.json();
            this.users.set(user.id, u);
        } 
    }

    async fetchUser(userID: string) {
        const { body } = await request(Endpoints.API + `/users/${userID}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const user = await body.json() as APIUser;
        this.users.set(user.id, JSON.stringify(user));
    } 

    async fetchGuilds() {
        const { body } = await request(Endpoints.API + '/users/@me/guilds', {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const guilds = await body.json() as any[];
        for (const guild of guilds) {
            let server: any = await request(Endpoints.API + `/guilds/${guild.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bot ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            server = await server.body.json();
            this.guilds.set(guild.id, server);
            await this.fetchGuildChannels(guild.id);
            await this.fetchGuildMembers(guild.id);
        } 
    }

    async fetchGuildChannels(ID: string) {
        const { body } = await request(Endpoints.API + `/guilds/${ID}/channels`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const channels = await body.json() as any[];
        const guild = this.guilds.get(ID)[0];
        for (const channel of channels) {
            let c = new TextChannel(this, channel);  
            await this.fecthChannelMessages(guild?.ID as string, c); 
            
            guild?.channels.set(channel.id, channel);
            this.channels.set(channel.id, channel);
        }
    }

    async fetchGuildMembers(ID: string) {
        const { body } = await request(Endpoints.API + `/guilds/${ID}/members`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const members = await body.json() as any[];
        const guild = this.guilds.get(ID)[0];
        for (let member of members) {
            await this.fetchUser(member.id)
            guild?.members.set(member.id, member);
        }
    }

    async fecthChannelMessages(guildID: string, channel: TextChannel) {
        const { body } = await request(Endpoints.API + `/channels/${channel.ID}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const messages = await body.json() as any[];
        const guild = this.guilds.get(guildID)[0];
        for (const message of messages) {
            let m = new Message(this, message);
            //guild?.channels.get(channel.ID)[0]?.messages.set(message.id, m);
            this.channels?.get(channel.ID)[0]?.messages.set(message.id, m);
        }
    }

    toJSON() {
        return JSON.stringify(this)
    }
}