import { } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { Client } from 'lib/index';
import RESTManager from 'lib/rest/RESTManager';
import { request } from "undici";

export class Users {
    constructor(private client: Client, private restManager: RESTManager) {

    }

    async leaveGuilds(guildsIDs: string[]) {
        let length = guildsIDs.length;
        for (const guildID  in guildsIDs) {
            await request(Endpoints.API + `/users/@me/guilds/${guildID}`, {
                method: 'DELETE',
                headers: this.restManager.headers
            }).catch(() => length--);
        }
        return length;
    }
}