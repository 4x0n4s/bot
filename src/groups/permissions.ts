import { Message, Role, TextChannel } from 'discord.js';;
import { Command } from '@lib/utilities/decorators';

export default class {
    /*
    [Permissions Commands]
    */

    @Command({
        name: 'set perm',
        arguments: [{ id: 'cp', type: 'notParsed' }, { id: 'role', type: 'role' }], 
        description: [['set perm', 'set perm']],
        list: 'Utilities'
    })
    async set_perm(message: Message, args: { cp: string[] | string, role: Role }, translate: (t: string) => string) {
        let { cp, role } = args;
        cp = cp[0];

        let perm = Number(cp);
        const commands = Main.manager.getCommands().filter(([_, command]) => command.name.startsWith(cp));
        if(Number.isInteger(perm)) {
            perm
        } else if(commands) {
            commands.length;
        } else return;
        // WHERE commandID = ?;
    }
}   