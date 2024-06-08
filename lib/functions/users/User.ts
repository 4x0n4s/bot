import { URLFunction } from '@typings';
import { APIUser } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';

export default class User {
    public readonly ID: Snowflake;
    public readonly userName: string;
    public readonly globalUserName: string | null;
    public readonly avatar: string | null;
    public readonly banner: string | null;
    public readonly isBot: boolean;
    public readonly premiumType: number | null;

    constructor(public data: APIUser) {
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

    toJSON() {
        
    }
}