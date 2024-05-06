import { APIUser, URLFunction } from '@typings';
import { Client } from '@lib/index';

export default class Channel {
    constructor(private client: Client, data: any) {
        this.ID = data.id;
    }

    ID: string;
}