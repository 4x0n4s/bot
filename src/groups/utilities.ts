import type { Message, TextChannel } from 'discord.js';
import { Command } from '@decorators';

export default class {
    /*
    [Utilities Commands]
    */
    @Command({
        name: 'set starboard',
        arguments: [{ type: 'channel', id: 'channel'}],
        description: [['set starboard <channel>', 'setstarboard']],
        list: 'Utilities'
    })
    setstarboard(message: Message, args: { channel: TextChannel }, translate: (t: string) => string) {
        let { channel } = args;

        databaseClient.query(`
            INSERT INTO starboard (guildID, logsID)
            VALUES (?, ?)
            ON CONFLICT (guildID)
            DO UPDATE SET logsID = excluded.logsID;
        `).run(message.guild?.id as string, channel.id);

        let reply = (t: string) => translate(t) // #length, #reason
            .replaceAll('#channel', `${channel}`)
        message.reply(reply('setStarBoardsChannel'));
    }
}   