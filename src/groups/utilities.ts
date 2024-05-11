import type { Message, Channel } from 'lib/index';
import { parseEmoji } from 'discord.js';
import { Command } from 'lib/utilities/decorators';

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
    setstarboard(message: Message, args: { channel: Channel }, translate: (t: string) => string) {
        let { channel } = args;

        const query = databaseClient.query(`
            INSERT INTO starboard (guildID, logsID)
            VALUES (?, ?)
            ON CONFLICT (guildID)
            DO UPDATE SET logsID = excluded.logsID;
            RETURNING *;
        `).get(message.guild?.ID as string, channel.ID);

        let reply = (t: string) => translate(t) // #length, #reason
            .replaceAll('#channel', `${channel}`)
        message.send(reply('setStarBoardsChannel'));
    }
}   