import { Endpoints } from '#lib/utilities/Constants';
import { APIEmoji, APIUser } from '@typings';
import { Client, User, Role } from 'lib/index';
import { request } from 'undici';

export default class Emoji {
    constructor(private client: Client, data: APIEmoji) {
        this.ID = data.id;
        this.name = data.name;
        this.creator = this.client.users.get(data.user?.id as string) ?? null; 
        this.isAnimated = data.animated ?? false;
        this.isAvailable = data.available ?? false;
        this.isManaged = data.managed ?? false;
        this.rolesIDs = data.roles ?? null;
    }

    ID: string | null;
    name: string | null;
    creator: User | null;
    isAnimated: boolean;
    isManaged: boolean;
    isAvailable: boolean;
    //url: 
    rolesIDs: Role['ID'][] | null;

    async addRoles(rolesIDs: User['ID'][]) {
        for (const roleID of rolesIDs) {
           await request(Endpoints.API + `/guilds/$'/emojis/{emoji.id}`) 
        }
        
    }
}