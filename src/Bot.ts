import { BotOptions } from '@typings';
import Manager from './functions/Manager';
import { Client } from 'discord.js';
import DatabaseClient from 'src/Database';
import { Intents } from 'lib/Constants';

export default class Bot extends Client {
    constructor ({ token }: BotOptions) {
        super({
            intents: Intents.All
        });
        this.login(token);
        this.manager = new Manager();
        this.manager.load();
        this.on('ready', async () => {
            console.log('Logged');
        });
    }

    databaseClient!: DatabaseClient;
    manager: Manager;
}