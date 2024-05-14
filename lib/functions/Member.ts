import { KeyTypes } from '@typings';
import { APIGuildMember } from 'discord-api-types/v10';
import Base from 'lib/functions/Base';
import { 
    Client, 
    Guild, 
    Role, 
    Storage
} from 'lib/index';

export default class Member extends Base {
    constructor(private client: Client, data: APIGuildMember, guild: Guild) {
        super();
        this.ID = data.user?.id ?? null;
    }

    ID: string | null;    
    roles: Storage<KeyTypes, Role> = new Storage();
}