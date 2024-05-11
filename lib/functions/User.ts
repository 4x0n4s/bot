import { APIUser, URLFunction } from '@typings';
import { Endpoints } from 'lib/utilities/Constants';
import { Client } from 'lib/index';

export default class User {
    constructor(private client: Client, data: APIUser) {
        this.ID = data.id;
        this.userName = data.username;
        this.tag = data.discriminator;
        this.userTag = `${this.userName}#${this.tag}`;
        this.globalUserName = data.global_name;
        this.avatar = data.avatar;
        this.banner = data.banner ?? null;
        this.bot = data.bot ?? false;
        this.flags = data.flags ?? null;
        this.premiumType = data.premium_type ?? null;
    }

    ID: string;
    userName: string;
    tag: string;
    userTag: string;
    globalUserName: string | null;
    avatar: string | null;
    banner: string | null;
    avatarURL({ format = 'PNG' }: URLFunction): string | null {
        return this.avatar ? Endpoints.ATTACHEMENTS + `/avatars/${this.ID}/${this.avatar}.${format.toLowerCase()}` : null;
    }
    bannerURL({ format = 'PNG' }: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/avatars/${this.ID}/${this.avatar}.${format.toLowerCase()}` : null;
    } 
    bot: boolean;
    flags: number | null;
    premiumType: number | null;
        
}