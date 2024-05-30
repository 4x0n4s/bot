import { APIReaction } from 'discord-api-types/v10';
import { Client } from '@lib/index';
import Base from '@lib/functions/Base';

export class Reaction extends Base {
    constructor(private client: Client, data: APIReaction) {
        super();
    }
}