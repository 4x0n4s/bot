import { APIChannel, APIGuild, URLFunction } from '@typings';
import { Endpoints } from '@lib/utilities/Constants';
import { Client, Storage, Channel } from '@lib/index';

export default class Guild {
    constructor (private client: Client, data: any) {
        this.ID = data.id;
        this.name = data.name;
        this.description = data.description;
        this.icon = data.icon
        this.banner = data.banner;
        this.premiumTier = Number(data.premium_tier);
        this.channels = new Storage();
        this.channels.sets(data.channels.map((channel: any) => [channel.id, new Channel(this.client, channel)])); 
    }

    ID: string | null;
    name: string;
    description: string | null;
    icon: string | null;
    banner: string | null;
    iconURL(avatarURLFunction: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/icons/${this.ID}/${this.icon}.png *.${avatarURLFunction.format.toLowerCase()}` : null;
    }
    bannerURL(bannerURLFunction: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/banners/${this.ID}/${this.banner}.${bannerURLFunction.format.toLowerCase()}` : null;
    }
    premiumTier: number | null;
    channels: Storage<string, Channel>;
}