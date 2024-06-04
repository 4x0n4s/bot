import { APIReaction } from 'discord-api-types/v10';
import { Client } from 'lib/index';

export default class Reaction {
    constructor(
        public data: APIReaction
    ) {
    }

    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(data: APIReaction) {
        return new Reaction(data);
    }
}