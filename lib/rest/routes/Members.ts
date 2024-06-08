import { CreateMessageOptionsData } from '@typings';
import { Endpoints } from 'lib/Constants';
import { Client, Message } from 'lib/index';
import RESTManager from 'lib/rest/RESTManager';
import { request } from "undici";

export class Members {
    private _client: Client;
    constructor(client: Client) {
        this._client = client;
    }

    async addMemberRoles(
        guildID: string, 
        memberID: string, 
        rolesIDs: array<string>, 
        reason?: string
    ): Promise<number> {
        const guild = this._client.guilds.get(guildID)[0];
        const guildMember = guild?.members.get(memberID)[0];
        const guildMembersRoles = guildMember?.roles;

        rolesIDs = rolesIDs.filter(roleID => !guildMembersRoles?.includes(roleID));
        let length = rolesIDs.length;
        for (const roleID of rolesIDs) {
            await request(Endpoints.API + `/guilds/${guildID}/members/${memberID}/roles/${roleID}`, {
                method: 'PUT',
                headers: { 
                    ...this._client.rest.headers,
                    'X-Audit-Log-Reason': reason 
                }
            }).catch(() => length--);
        } 
        return length;
    }
}