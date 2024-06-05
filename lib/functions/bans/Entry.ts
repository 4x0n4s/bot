import { APIBan } from 'discord-api-types/v10';
import { User } from 'lib/index'

export default class BanEntry {
    public readonly user: User;
    public readonly reason: string | null;

    constructor(data: APIBan) {
        this.user = new User(data.user);
        this.reason = data.reason;
    }

    toJSON() {
        return JSON.stringify(this);
    }

    static fromJSON(data: APIBan) {
        return new BanEntry(data);
    }
}