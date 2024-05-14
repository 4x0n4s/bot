import { URLFunction } from '@typings';
import { APIEmoji } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import Base from 'lib/functions/Base';
import { 
    Client,
    User, 
    Role 
} from 'lib/index';

export default class Emoji extends Base {
    constructor(private client: Client, data: APIEmoji) {
        super();
        this.ID = data.id;
        this.name = data.name;
        this.creator = data.user 
            ? client.users.get(data.user?.id) as User
            : null; 
        this.isAnimated = data.animated ?? false;
        this.isAvailable = data.available ?? false;
        this.isManaged = data.managed ?? false;
        this.rolesIDs = data.roles ?? null;
        
    }

    ID: string | null;
    name: string | null;
    creator: User | null;
    isAnimated: boolean;
    isAvailable: boolean;
    isManaged: boolean;
    url({ format = 'PNG' }: URLFunction): string | null {
        return this.ID ? Endpoints.ATTACHEMENTS + `/emojis/${this.ID}.${format.toLowerCase()}` : null;
    }
    rolesIDs: Role['ID'][] | null;
}