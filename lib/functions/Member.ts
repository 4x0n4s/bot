import { KeyTypes } from '@typings';
import { APIGuildMember } from 'discord-api-types/v10';
import { 
    Client, 
    Role, 
    Storage
} from '@lib/index';
import Base from '@lib/functions/Base';

export class Member extends Base {
    constructor(
        client: Client, 
        data: APIGuildMember
    ) {
        super();
        this.ID = data.user?.id ?? null;
    }
    ID: Snowflake | null;    
    roles: Storage<KeyTypes, Role> = new Storage();
}