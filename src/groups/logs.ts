import type { Message } from 'discord.js';
import { Command } from '@decorators';

export default class {
    /*
    [Tests Commands]
    */
    @Command({
        name: 'logs',
        arguments: [],
        description: [['logs', 'e']],
        list: 'Logs'
    })
    async logs_command(message: Message, {}) {
        message.reply('test')
    }
}   