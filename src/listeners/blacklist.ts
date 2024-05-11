import type { GuildBan } from 'discord.js';
import type { BlackListData } from '@typings';
import { Event } from 'lib/utilities/decorators';

export default class {
    @Event('guildBanRemove')
    async exec(ban: GuildBan) {
        const { guild, user } = ban;
        let blacklist = this.getBlacklist();
        const isBlacklisted = blacklist
            .map(bl => { return bl.userID })
            .includes(user.id);

        if(isBlacklisted) {
            guild.bans.create(user, {
                reason: 'Blacklisted'
            });
        }
    }

     getBlacklist(): BlackListData[] {
        const query = databaseClient.query(`
            SELECT userID FROM blacklist
        `);
        const blacklist = query.all() as BlackListData[];
        return blacklist;
    }
}