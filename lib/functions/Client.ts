import { KeyTypes, ClientSettings, Events } from '@typings';
import { Endpoints } from 'lib/utilities/Constants';
import { Channel, ClientUser, Guild, Member, Message, Storage, User } from 'lib/index';

import WebSocket from "lib/ws/WebSocket";
import EventEmitter from 'events';
import { request } from 'undici';

export default class Client extends EventEmitter {
    private _ws: WebSocket = new WebSocket(this);
    private _user!: ClientUser;
    guilds: Storage<KeyTypes, Guild> = new Storage();
    users: Storage<KeyTypes, User> = new Storage();
    channels: Storage<KeyTypes, Channel> = new Storage();
    token!: string | null;
    isReady: boolean = false;

    constructor(public settings: ClientSettings) {
        super();
    }

    connect(token?: string) {
        token = this.settings?.token ? this.settings.token : token;
        this.token = token ?? null;

        if (token && typeof token === 'string') {
            return this._ws.connect(token);
        } else {
            //Error
        }
    }

    on<Event extends keyof Events>
    (
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
        console.log(users)
        for (const user of users) {
            let u: any = await request(Endpoints.API + `/users/${user.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bot ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            u = await u.body.json();
            this.users.set(user.id, new User(this, u));
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

        const user = await body.json() as any;
        this.users.set(user.id, new User(this, user));
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
            this.guilds.set(guild.id, new Guild(this, server));
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
        const guild = this.guilds.get(ID);
        for (const channel of channels) {
            let c = new Channel(this, channel);
            await this.fecthChannelMessages(guild?.ID as string, c);
            guild?.channels.set(channel.id, c);
            this.channels.set(channel.id, c);
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
        const guild = this.guilds.get(ID);
        for (let member of members) {
            await this.fetchUser(member.id)
            guild?.members.set(member.id, new Member(this, member, guild));
        }
    }

    async fecthChannelMessages(guildID: string, channel: Channel) {
        const { body } = await request(Endpoints.API + `/channels/${channel.ID}/messages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const messages = await body.json() as any[];
        const guild = this.guilds.get(guildID);
        for (const message of messages) {
            let m = new Message(this, message);
            guild?.channels.get(channel.ID)?.messages.set(message.id, m);
            this.channels?.get(channel.ID)?.messages.set(message.id, m);
        }
    }

    toJSON() {
        return JSON.stringify(this)
    }
}