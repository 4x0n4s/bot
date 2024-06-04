import { BotOptions } from '@typings';
import Manager from './functions/Manager';
import { Client } from 'discord.js';
import DatabaseClient from 'src/Database';
import { Intents } from 'lib/Constants';

export default class Bot extends Client {
    constructor (private botOptions: BotOptions) {
        super({
            intents: Intents.All
        });
        let { token } = botOptions;
        this.manager = new Manager();
        this.login(token);
        this.manager.load();
        this.on('ready', async () => {
            console.log('Logged');
        });
    }

    databaseClient!: DatabaseClient;
    manager: Manager;
}