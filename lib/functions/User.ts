import { URLFunction } from '@typings';
import { APIUser } from 'discord-api-types/v10';
import { Endpoints } from '@lib/utilities/Constants';
import Base from '@lib/functions/Base';
import { Client } from '@lib/index';

export class User extends Base {
    constructor(
        client: Client, 
        data: APIUser
    ) {
        super();
        this.ID = data.id;
        this.userName = data.username;
        this.globalUserName = data.global_name;
        this.avatar = data.avatar;
        this.banner = data.banner ?? null;
        this.isBot = data.bot ?? false;
        this.premiumType = data.premium_type ?? null;
    }
    avatarURL({ format = 'PNG' }: URLFunction): string | null {
        return this.avatar ? Endpoints.ATTACHEMENTS + `/avatars/${this.ID}/${this.avatar}.${format.toLowerCase()}` : null;
    }
    bannerURL({ format = 'PNG' }: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/avatars/${this.ID}/${this.avatar}.${format.toLowerCase()}` : null;
    } 

    ID: Snowflake;
    userName: string;
    globalUserName: string | null;
    avatar: string | null;
    banner: string | null;
    isBot: boolean;
    premiumType: number | null;
}