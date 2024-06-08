import type { GuildBan } from 'discord.js';
import type { BlackListData } from '@typings';
import { Event } from '@decorators';

export default class {
    @Event('guildBanRemove')
    async exec(ban: GuildBan) {
        const { guild, user } = ban;
        const blacklist = this.getBlacklist();
        const isBlacklisted = blacklist
            .map(bl => bl.userID)
            .includes(user.id);

        if(isBlacklisted) {
            guild.bans.create(user, {
                reason: 'Blacklisted'
            });
        }
    }

    getBlacklist(): BlackListData[] {
        const query = databaseClient.query(`
            SELECT * FROM blacklist
        `);
        const blacklist = query.all() as BlackListData[];
        return blacklist;
    }
}