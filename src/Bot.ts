import { BotOptions } from '@typings';
import { Manager } from 'lib/index';
import { Client } from 'discord.js';
import DatabaseClient from 'src/Database';
import { Intents } from 'lib/utilities/Constants';

export default class Bot extends Client {
    constructor (private botOptions: BotOptions) {
        super({
            intents: Intents.All
        });
        let { token } = botOptions;
        this.login(token);
        this.commandsManager.load();
        this.on('ready', async () => {
            console.log('Logged')
        });
    }

    databaseClient!: DatabaseClient;
    commandsManager: Manager = new Manager();
}