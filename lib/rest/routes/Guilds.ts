import { APIGuild, GatewayGuildModifyDispatch } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import RESTManager from 'lib/rest/RESTManager';
import { Client, Guild, Member, Role } from 'lib/index';
import { request } from 'undici';

export class Guilds {
    private _client: Client;
    constructor(client: Client) {
        this._client = client;
    }

    async edit(
        guildID: string, 
        reason?: string
    ): Promise<void> {
        await request(Endpoints.API + `/guilds/${guildID}/`, {
            method: 'PATCH',
            headers: {
                ...this._client.rest.headers,
                'X-Audit-Log-Reason': reason 
            },
            body: JSON.stringify({
                afk_channel_id: ''
            } as APIGuild)
        });
    }
}