import { Message, Role, TextChannel } from 'discord.js';;
import { Command } from '@decorators';

export default class {
    /*
    [Permissions Commands]
    */

    @Command({
        name: 'set perm',
        arguments: [{ id: 'perm', type: 'number' }, { id: 'role', type: 'role' }], 
        description: [['set perm <perm> <role>', 'set perm']],
        list: 'Utilities'
    })
    async set_perm(message: Message, args: { perm: number, role: Role }, translate: (t: string) => string) {
        let { perm, role } = args;

        if(Number.isInteger(perm)) {
            perm
        } else return
        // WHERE commandID = ?;
    }
}   