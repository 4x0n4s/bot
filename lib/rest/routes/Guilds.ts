import { } from '@typings';
import { APIGuild, GatewayGuildModifyDispatch } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import RESTManager from 'lib/rest/RESTManager';
import { Client, Guild, Member, Role } from 'lib/index';
import { request } from 'undici';

export default class Guilds {
    constructor(private client: Client, private restManager: RESTManager) {

    }

    async edit(guildID: string, reason?: string) {
        await request(Endpoints.API + `/guilds/${guildID}/`, {
            method: 'PATCH',
            headers: { ...this.restManager.headers, 'X-Audit-Log-Reason': reason },
            body: JSON.stringify({
                afk_channel_id: ''
            } as APIGuild)
        });
    }

    async addMemberRoles(guildID: Guild['ID'], memberID: Member['ID'], rolesIDs: Role['ID'][], reason?: string) {
        const guildData = this.client.guilds.get(guildID);
        const guildMember = guildData?.members.get(memberID);
        const guildMembersRoles = guildMember?.roles;

        const memberHasRole = (roleID: string) => guildMembersRoles?.has(roleID);
        rolesIDs = rolesIDs.filter(memberHasRole);

        let length = rolesIDs.length;
        for (const roleID of rolesIDs) {
            await request(Endpoints.API + `/guilds/${guildID}/members/${memberID}/roles/${roleID}`, {
                method: 'PUT',
                headers:  { ...this.restManager.headers, 'X-Audit-Log-Reason': reason }
            }).catch(() => length--);
        } 
        return length;
    }
}