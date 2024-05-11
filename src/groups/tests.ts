import type { Message, User } from 'lib/index';
import { Command } from 'lib/utilities/decorators';

export default class {
    /*
    [Tests Commands]
    */

    @Command({
        name: 'test',
        arguments: [],
        description: [['test', 'test']],
        list: 'Test'
    })
    async test(message: Message) {
        message.send('test');
    }
}   