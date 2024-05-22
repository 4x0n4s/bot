import type { Message, TextChannel } from 'discord.js';
import { parseEmoji } from 'discord.js';
import { Command } from 'lib/utilities/decorators';

export default class {
    /*
    [Utilities Commands]
    */

    @Command({
        name: 'create',
        arguments: [{ type: 'any', id: 'emojis' }],
        description: [['', '']],
        list: 'Utilities'
    })
    async create_emoji(message: Message, args: { emojis: string[] }, translate: (t: string) => string) {
        let { emojis } = args;

        if(emojis.length === 0) {
            message.reply('0 emojis');
            return;
        }

        let guildEmojis = message.guild?.emojis;

        let length = emojis.length;
        emojis.forEach(e => {
                let emoji = parseEmoji(e);
                if(emoji?.id && !guildEmojis?.cache.find(e => e.name == emoji.name)) {
                    const attachment = `https://cdn.discordapp.com/emojis/${emoji.id + emoji.animated ? '.gif' : '.png'}`
                    message.guild?.emojis.create({
                        attachment, 
                        name: emoji.name
                    }).catch(() => length--);
                } else length--;
            });
        await message.reply(`${length} emojis created`);
    }

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