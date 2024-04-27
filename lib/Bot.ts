import type { ClientConstructorOptions, CommandConstructorOptions, Events } from '@typings';
import * as Discord from 'discord.js';
import * as fs from 'node:fs';
import * as Constants from '@lib/utils/Contants';
import Storage from '@lib/utils/Storage';
import HandlersManager from '@lib/Manager';

export default class Bot extends Discord.Client {
    constructor (private clientOptions: ClientConstructorOptions) {
        super({
            intents: Constants.DiscordIntents
        });
        let { token } = clientOptions;
        this.login(token);
        this.handlersManager.load()
        this.on('ready', async () => {
            console.log('coucou')
        })
    }

    handlersManager: HandlersManager = new HandlersManager(this);
}