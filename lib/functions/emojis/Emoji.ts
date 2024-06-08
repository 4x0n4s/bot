import { URLFunction } from '@typings';
import { APIEmoji } from 'discord-api-types/v10';
import { Endpoints } from 'lib/Constants';
import { Client, User } from 'lib/index';

export default class Emoji {
    public readonly ID: Snowflake | null;
    public readonly name: string | null;
    public readonly creator: User | null;
    public readonly isAnimated: boolean;
    public readonly isAvailable: boolean;
    public readonly isManaged: boolean;
    public readonly rolesIDs: Snowflake[] | null;

    constructor(private data: APIEmoji) {
        this.ID = data.id;
        this.name = data.name;
        this.creator = data.user ? new User(data.user): null; 
        this.isAnimated = data.animated ?? false;
        this.isAvailable = data.available ?? false;
        this.isManaged = data.managed ?? false;
        this.rolesIDs = data.roles ?? null;
        
    }
    url({ format = 'PNG' }: URLFunction): string | null {
        return this.ID ? Endpoints.ATTACHEMENTS + `/emojis/${this.ID}.${format.toLowerCase()}` : null;
    }

    toJSON() {
        return JSON.stringify(this.data);
    }

}