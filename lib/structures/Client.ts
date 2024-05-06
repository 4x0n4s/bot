import { ClientSettings, Events } from '@typings';
import { Channel, ClientUser, Guild, Storage } from '@lib/index';
import * as Endpoints from '@lib/utils/Endpoints';

import EventEmitter from 'events';
import { request } from 'undici';
import WebSocket from "@lib/ws/WebSocket";

export default class Client extends EventEmitter {
    private _ws: WebSocket = new WebSocket(this);
    private _user!: ClientUser;
    guilds: Storage<string, Guild> = new Storage()
    token: string | undefined;
    isReady: boolean = false;

    constructor(public settings: ClientSettings) {
        super();
    }

    connect(token?: string) {
        token = this.settings.token ? this.settings.token : token;
        this.token = token;
        if (token && typeof token == 'string') {
            return this._ws.connect(token);
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

    async fetchGuilds() {
        const req = await request(Endpoints.DiscordApiEndpoint + '/users/@me/guilds', {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const guilds = await req.body.json() as any[];
        for (const guild of guilds) {
            let server: any = await request(Endpoints.DiscordApiEndpoint + `/guilds/${guild.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bot ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            server = await server.body.json();
            this.guilds.set(guild.id, new Guild(this, {
                ...server,
                channels: []
            }));
            await this.fetchGuildChannels(guild.id);
        } 
    }

    async fetchGuildChannels(ID: string) {
        let req = await request(Endpoints.DiscordApiEndpoint + `/guilds/${ID}/channels`, {
            method: 'GET',
            headers: {
                'Authorization': `Bot ${this.token}`,
                'Content-Type': 'application/json'
            }
        });

        const channels = await req.body.json() as any[];
        const guild = this.guilds.get(ID);
        for (let channel of channels) {
            guild?.channels.set(channel.id, new Channel(this, channel));
        }
    }

    toJSON() {
        return JSON.stringify(this)
    }
}