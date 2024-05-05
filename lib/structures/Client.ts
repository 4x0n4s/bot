import { ClientSettings, Events } from '@typings';
import { ClientUser } from '@lib/index';

import EventEmitter from 'events';
import WebSocket from "@lib/ws/WebSocket";

export default class Client extends EventEmitter {
    private _ws: WebSocket = new WebSocket(this);
    private _user!: ClientUser;
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

    toJSON() {
        return JSON.stringify(this)
    }
}