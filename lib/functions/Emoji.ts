import { URLFunction } from '@typings';
import { APIEmoji } from 'discord-api-types/v10';
import { Endpoints } from '@lib/utilities/Constants';
import { 
    Client,
    User, 
} from '@lib/index';
import Base from '@lib/functions/Base';

export class Emoji extends Base {
    constructor(
        client: Client, 
        data: APIEmoji
    ) {
        super();
        this.ID = data.id;
        this.name = data.name;
        this.creator = data.user 
            ? client.users.get(data.user?.id) ?? new User(client, data.user)
            : null; 
        this.isAnimated = data.animated ?? false;
        this.isAvailable = data.available ?? false;
        this.isManaged = data.managed ?? false;
        this.rolesIDs = data.roles ?? null;
        
    }
    url({ format = 'PNG' }: URLFunction): string | null {
        return this.ID ? Endpoints.ATTACHEMENTS + `/emojis/${this.ID}.${format.toLowerCase()}` : null;
    }
    ID: Snowflake | null;
    name: string | null;
    creator: User | null;
    isAnimated: boolean;
    isAvailable: boolean;
    isManaged: boolean;
    rolesIDs: Snowflake[] | null;
}