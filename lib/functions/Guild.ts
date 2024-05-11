import { KeyTypes, APIGuild, URLFunction } from '@typings';
import { Endpoints } from 'lib/utilities/Constants';
import { Client, Storage, Channel, Member, Emoji, Role } from 'lib/index';

export default class Guild {
    constructor (private client: Client, data: APIGuild) {
        this.ID = data.id;
        this.name = data.name;
        this.description = data.description;
        this.icon = data.icon
        this.banner = data.banner;
        this.premiumTier = Number(data.premium_tier);
        this.channels = new Storage();
        this.members = new Storage();
        this.roles = new Storage();
        this.emojis = new Storage();
    }

    ID: string | null;
    name: string;
    description: string | null;
    icon: string | null;
    banner: string | null;
    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
    bannerURL({ format = 'PNG' }: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/banners/${this.ID}/${this.banner}.${format.toLowerCase()}` : null;
    }
    premiumTier: number | null;
    channels: Storage<KeyTypes, Channel>;
    members: Storage<KeyTypes, Member>;
    roles: Storage<KeyTypes, Role>;
    emojis: Storage<KeyTypes, Emoji>;
}