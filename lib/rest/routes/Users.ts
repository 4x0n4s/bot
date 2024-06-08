import { } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { Client } from 'lib/index';
import RESTManager from 'lib/rest/RESTManager';
import { request } from "undici";

export class Users {
    private _client: Client;
    constructor(client: Client) {
        this._client = client;
    }

    me() {

    }

    async leaveGuilds(guildsIDs: string[]): Promise<number> {
        let length = guildsIDs.length;
        for (const guildID  in guildsIDs) {
            await request(Endpoints.API + `/users/@me/guilds/${guildID}`, {
                method: 'DELETE',
                headers: this._client.rest.headers
            }).catch(() => length--);
        }
        return length;
    }
}