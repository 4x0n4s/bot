import { APIApplication, APIUser, URLFunction } from '@typings';
import { Endpoints } from 'lib/utilities/Constants';
import { Client, User } from 'lib/index';

export default class Application {
    constructor(private client: Client, data: APIApplication) {
        this.ID = data.id;
        this.description = data.description;
        this.owner = new User(this.client, data.owner as APIUser);
        this.isPublic = data.bot_public;
        
    }

    ID: string;
    owner: User;
    description: string;
    isPublic: boolean;    
}