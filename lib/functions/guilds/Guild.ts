import { KeyTypes, URLFunction,CreateEmojiOptions } from '@typings';
import { APIGuild } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { Client, Storage, Member, Emoji, Role } from 'lib/index';

export default class Guild {
    private _client: Client;
    public readonly ID: string | null;
    public readonly name: string;
    public readonly description: string | null;
    public readonly icon: string | null;
    public readonly banner: string | null;
    public readonly premiumTier: number;
    public readonly channels: Storage<KeyTypes, any>;
    public readonly members: Storage<KeyTypes, Member>;
    public readonly roles: Storage<KeyTypes, Role>;
    public readonly emojis: Storage<KeyTypes, Emoji>;
    public readonly bans: Storage<KeyTypes, Emoji>;

    constructor (
        client: Client, 
        public data: APIGuild
    ) {
        this._client = client;
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
        this.bans = new Storage();
    }

    iconURL({ format = 'PNG' }: URLFunction): string | null {
        return this.icon ? Endpoints.ATTACHEMENTS + `/icons/${this.ID}/${this.icon}.${format.toLowerCase()}` : null;
    }
    bannerURL({ format = 'PNG' }: URLFunction): string | null {
        return this.banner ? Endpoints.ATTACHEMENTS + `/banners/${this.ID}/${this.banner}.${format.toLowerCase()}` : null;
    }

    async editGuildName(name?: string, reason?: string) {
        if(this.ID) await this._client.rest.guilds.edit('name', name);
    }

    async createEmojis(emojis: CreateEmojiOptions | CreateEmojiOptions[], reason?: string) {
        if(!Array.isArray(emojis)) emojis = [emojis] as CreateEmojiOptions[];
        return this._client.rest.emojis.create(this, emojis, reason);
    }


    // TODO
    toJSON() {
        return JSON.stringify(this.data);
    }

    static fromJSON(client: Client, data: APIGuild) {
        return new Guild(client, data);
    }
}