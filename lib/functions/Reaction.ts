import { URLFunction } from '@typings';
import { APIReaction, APITeam } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import Base from 'lib/functions/Base';
import { 
    Client,
    TeamMember 
} from 'lib/index';

export default class Reaction extends Base {
    constructor(private client: Client, data: APIReaction) {
        super();
        
    }
}