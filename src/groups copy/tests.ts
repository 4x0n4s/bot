import type { GuildMember, Message, User } from 'discord.js';
import { Command } from 'lib/utilities/decorators';

export default class {
    /*
    [Tests Commands]
    */

    @Command({
        name: 'test',
        arguments: [{ id: 'm', type: 'user' }],
        description: [['test', 'test']],
        list: 'Test'
    })
    async test(message: Message, args: {
        m: User
    }) {
        console.log('0' + args.m)
        message.reply('test');
    }
}   