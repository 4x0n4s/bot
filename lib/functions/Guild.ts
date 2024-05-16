import { 
    KeyTypes, 
    URLFunction,
    Reason,
    CreateEmojiOptions
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
    premiumTier: number;
    channels: Storage<KeyTypes, any>;
    members: Storage<KeyTypes, Member>;
    roles: Storage<KeyTypes, Role>;
    emojis: Storage<KeyTypes, Emoji>;

    async modifiyGuildName(name?: string, reason?: string) {
        if(this.ID) await this.client.rest.guilds.edit('name', name);
    }

    async createEmojis(emojis: CreateEmojiOptions | CreateEmojiOptions[], reason?: string) {
        if(!Array.isArray(emojis)) emojis = [emojis] as CreateEmojiOptions[];
        return this.client.rest.emojis.create(this, emojis, reason);
    }
}