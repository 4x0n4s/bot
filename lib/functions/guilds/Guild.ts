import { URLFunction,CreateEmojiOptions } from '@typings';
import { APIGuild, APIChannel, APIGuildMember, APIRole, APIEmoji, APIBan } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { Client, Storage, Member, Emoji, Role, Channel, BanEntry } from 'lib/index';

export default class Guild {
    private _client: Client;
    public readonly ID: string | null;
    public readonly name: string;
    public readonly description: string | null;
    public readonly icon: string | null;
    public readonly banner: string | null;
    public readonly premiumTier: number;
    public readonly channels: Storage<APIChannel>;
    public readonly members: Storage<APIGuildMember>;
    public readonly roles: Storage<APIRole>;
    public readonly emojis: Storage<APIEmoji>;
    public readonly bans: Storage<APIBan>;

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
        this.channels = new Storage(client, `channels:${this.ID}`, Channel);
        this.members = new Storage(client, `members:${this.ID}`, Member);
        this.roles = new Storage(client, `roles:${this.ID}`, Role);
        this.emojis = new Storage(client, `emojis:${this.ID}`, Emoji);
        this.bans = new Storage(client, `bans:${this.ID}`, BanEntry);
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