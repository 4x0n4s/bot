import { 
    KeyTypes, 
    URLFunction,
    Reason
} from '@typings';
import { APIGuild } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import Base from 'lib/functions/Base';
import { 
    Client,
    Storage,
    Member,
    Emoji,
    Role 
} from 'lib/index';

export default class Guild extends Base {
    constructor (private client: Client, data: APIGuild) {
        super();
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
    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
    bannerURL({ format = 'PNG' }: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/banners/${this.ID}/${this.banner}.${format.toLowerCase()}` : null;
    }
    premiumTier: number;
    channels: Storage<KeyTypes, any> = new Storage();
    members: Storage<KeyTypes, Member> = new Storage();
    roles: Storage<KeyTypes, Role> = new Storage();
    emojis: Storage<KeyTypes, Emoji> = new Storage();

    async modifiyGuildName(name?: string, r?: Reason) {
        if(this.ID) await this.client.rest.guilds.udpateData('name', name, this.ID, r?.reason);
    }

    async modifyGuildIcon(name?: string, r?: Reason) {
        if(this.ID) await this.client.rest.guilds.udpateData('icon', name, this.ID, r?.reason);
    }
}