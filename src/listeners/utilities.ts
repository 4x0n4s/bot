import type { User, MessageReaction, TextChannel, Message } from 'discord.js';
import { Event } from '@decorators';
import { StarBoardsData, StarBoardConfigData } from '@typings';

import { defaultColor } from 'lib/Constants';

export default class {
    //StarBoards
    @Event('messageReactionAdd')
    async handleStarBoards(reaction: MessageReaction , user: User) {
        let { databaseClient, Main } = global;
        const { message, emoji } = reaction;
        const { guild, channel, reactions } = message;
        if (!guild || !channel || emoji.name !== '⭐') return;

        const starboardConfig = databaseClient.query(`
            SELECT * FROM starboard WHERE guildID = ?;
        `).get(guild.id) as StarBoardConfigData;

        if(!starboardConfig.logsID) return;
        const { logsID } = starboardConfig;

        let starboard = databaseClient.query(`
            SELECT * FROM starboards WHERE guildID = ? AND channelID = ? AND messageID = ?;
        `).get(guild?.id, channel.id, message.id) as StarBoardsData;

        const logs = guild.channels.cache.get(logsID) as TextChannel;
        const count = reactions.cache.get('⭐')?.count;

        if(!starboard) {
            const url = `https://discord.com/channels/${guild.id}/${channel.id}/${message.id}`;
            const m = await logs.send({
                content: `${count} ⭐ <#${channel.id}>`,
                embeds: [{
                    author: { name: user.username, icon_url: user.avatarURL() as string, url },
                    fields: [{ name: 'Message', value: `[Redirection](${url})`}],
                    timestamp: new Date().toISOString(),
                    color: defaultColor
                }]
            });
            starboard = { guildID: guild.id, channelID: channel.id, messageID: message.id, targetID: m.id };
            databaseClient.query(`
                INSERT INTO starboards (guildID, channelID, messageID, targetID) VALUES (?, ?, ?, ?);
            `).run(...Object.values(starboard));
        }

        const { messageID, channelID, targetID } = starboard
        const messages = logs.messages.cache;
        const m = messages.get(targetID);

        if(Boolean(m)) {
            m?.edit({ content: `${count} ⭐ <#${channelID}>`});
        } else {
            databaseClient.query(`
                DELETE FROM starboards WHERE guildID = ? AND channelID = ? AND messageID = ?;
            `).run(guild.id, channelID, messageID);
        }
    }

    @Event('messageReactionRemove')
    async removeStarBoards(reaction: MessageReaction , user: User) {
       await this.handleStarBoards(reaction, user);
    }
}