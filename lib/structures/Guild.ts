import { APIGuild, URLFunction } from '@typings';
import { Client, User } from '@lib/index';
import { request } from 'undici';

export default class Guild {
    constructor (private client: Client, data: APIGuild) {
        this.ID = data.id;
        this.name = data.name;
        this.description = data.description;
        this.icon = data.icon
        this.banner = data.banner;
        this.premiumTier = data.premium_tier.valueOf();
    }

    ID: string | null;
    name: string;
    description: string | null;
    icon: string | null;
    banner: string | null;
    iconURL(avatarURLFunction: URLFunction): string | null {
        return this.icon ? `https://cdn.discordapp.com/icons/${this.ID}/${this.icon}.png *.${avatarURLFunction.format.toLowerCase()}` : null;
    }
    bannerURL(bannerURLFunction: URLFunction): string | null {
        return this.banner ? `https://cdn.discordapp.com/banners/${this.ID}/${this.banner}.${bannerURLFunction.format.toLowerCase()}` : null;
    }
    premiumTier: number | null;

}