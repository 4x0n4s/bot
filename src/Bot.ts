import type { BotOptions } from '@typings';
import { Intents } from 'lib/utilities/Constants';
import { Client, Manager } from 'lib/index';
import DatabaseClient from 'src/Database';

export default class Bot extends Client {
    constructor (private botOptions: BotOptions) {
        super();
        let { token } = botOptions;
        this.connect(token);
        this.commandsManager.load();
        this.on('connected', async () => {
            console.log('Logged')
        });
    }

    databaseClient!: DatabaseClient;
    commandsManager: Manager = new Manager(this);
}