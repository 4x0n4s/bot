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
import { APIGuild, APIUser } from 'discord-api-types/v10';

export class Client extends EventEmitter implements ClientType {
    private _ws: WebSocket = new WebSocket(this);
    private _user!: ClientUser;
    rest!: RESTManager;
    token!: string | null;
    isReady: boolean = false;
    guilds!: Storage<APIGuild>;
    users!: Storage<APIUser>;
    channels!: Storage<any>;
    cache!: BasicCacheFunctions;

    constructor(public settings: ClientSettings) {
        super();
    
        (async () => {
            this.guilds = new Storage(this, 'guilds', Guild);
            this.users = new Storage(this, 'guilds', Guild);
            this.channels = new Storage(this, 'guilds', Guild);


            for (let user of await this.rest.users.me()) this.users.set(user.id, await this.rest.users.get(user.id));

            for (let guild of await this.rest.guilds.me()) this.guilds.set(guild.id, await this.rest.guilds.get(guild.id, { channels: true, members: true, bans: true }));
        
        })();
    }

    connect(token?: string) {
        token = this.settings?.token ? this.settings.token : token;
        this.token = token ?? null;

        if (token && typeof token === 'string') {
            this._ws.connect(token);
            this.rest = new RESTManager(this);
            this.rest.setToken(token);
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