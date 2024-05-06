import { APIUser, URLFunction } from '@typings';
import { Endpoints } from '@lib/utilities/Constants';
import { Client } from '@lib/index';

export default class User {
    constructor(private client: Client, data: APIUser) {
        this.ID = data.id;
        this.userName = data.username;
        this.tag = data.discriminator;
        this.userTag = `${this.userName}#${this.tag}`;
        this.globalUserName = data.global_name;
        this.avatar = data.avatar;
        this.banner = data.banner;
        this.bot = data.bot;
        this.flags = data.flags;
        this.premiumType = data.premium_type;
    }

    ID: string;
    userName: string;
    tag: string;
    userTag: string;
    globalUserName: string | null;
    avatar: string | null;
    banner: string | null | undefined;
    avatarURL(avatarURLFunction: URLFunction): string | null {
        return this.avatar ? Endpoints.ATTACHEMENTS + `/avatars/${this.ID}/${this.avatar}.${avatarURLFunction.format.toLowerCase()}` : null;
    }
    bannerURL(bannerURLFunction: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/avatars/${this.ID}/${this.avatar}.${bannerURLFunction.format.toLowerCase()}` : null;
    } 
    bot: boolean | undefined;
    flags: number | undefined;
    premiumType: number | undefined;
        
}