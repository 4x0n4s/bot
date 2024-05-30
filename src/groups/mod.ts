import { GuildMember, Message } from 'discord.js';
import { Member } from '@lib/index';
import { Command } from '@lib/utilities/decorators';

export default class {
    /*
    [Mods Commands]
    */
    @Command({
        name: 'clear sanctions',
        arguments: [{ id: 'member', type: 'member' }], 
        description: [['clear sanctions <member>', 'Delete sanctions of an user']],
        list: 'Moderation'
    })
    clear_sanctions_command(message: Message, args: { member: GuildMember }, translate: (t: string) => string) {
        const { member } = args;

        if(!member) {
            message.reply('Bad Argument');
            return;
        }

        let length = databaseClient.query(`
            DELETE FROM sanctions WHERE memberID = ?
            RETURNING *;
        `).all(member.id).length;

        message.reply(translate('clearSanctionsMessage')
                .replace('$length', length.toString()));
    }

    @Command({
        name: 'ban', 
        arguments: [{ id: 'members', type: 'member', array: true }, { id: 'reason', type: 'string' }],
        description: [['ban <member(s)>', 'Ban a member(s)']],
        list: 'Moderation'
    })
    async ban_command(message: Message, args: { members: GuildMember[], reason: string }, translate: (t: string) => string) {
        let { members, reason } = args;

        if(!members) {
            message.reply('Bad Argument');
            return;
        }

        if(!reason) reason = translate('banDefaultReason');

        let length = members.length;
        for (const member of members) {
            member.ban({ reason })
                .then(member => this.addSanction('ban', member.id, message.author.id, message.guild?.id as string, reason))
                .catch(() => length--);
        }

        await message.reply(translate('banMessage')
            .replace('$length', length.toString())
            .replace('$reason', reason));
    }

    @Command({
        name: 'kick',
        arguments: [{ id: 'members', type: 'member', array: true }, { id: 'reason', type: 'string' }],
        description: [['kick <member(s)>', 'Kick a member(s)']],
        list: 'Moderation',
        
    })
    async kick_command(message: Message, args: { members: GuildMember[], reason: string }, translate: (t: string) => string) {
        let { members, reason } = args;
        
        if(!members) {
            message.reply('Bad Argument');
            return;
        }

        if(!reason) reason = translate('kickDefaultReason');

        let length = members.length;
        for (const member of members) {
            member.kick(reason)
                .then(member => this.addSanction('kick', member.id, message.author.id, message.guild?.id as string, reason))
                .catch(() => length--);
        }

        await message.reply(translate('kickMessage')
            .replace('$length', length.toString())
            .replace('$reason', reason));
    }

    @Command({
        name: 'delete sanction', 
        arguments: [{ id: 'member', type: 'member' }, { id: 'warnID', type: 'number' }], 
        description: [['delete sanction <member> <warnID>', 'Remove sanction']],
        list: 'Moderation'
    })
    delete_sanction(message: Message, args: { member: GuildMember, warnID: number }, translate: (t: string) => string) {
        let { member, warnID } = args;
        
        if(!member) {
            message.reply('Bad Argument');
            return;
        }

        databaseClient.query(`
            DELETE FROM sanctions WHERE ID = ? AND memberID = ? AND guildID = ?;
        `).run(warnID,  member.id, message.guild?.id as string);

        message.reply(translate('deleteSanctionMessage')
            .replace('$member', member.user.globalName ?? member.user.username)
            .replace('$warnID', warnID.toString()));
    }

    @Command({
        name: 'sanction', 
        arguments: [{ id: 'member', type: 'member' }, { id: 'reason',type: 'string' }], 
        description: [['sanction <member> [reason]', 'Add sanction']],
        list: 'Moderation'
    })
    sanction_command(message: Message, args: { member: GuildMember, reason: string }, translate: (t: string) => string) {
        let { member, reason } = args;

        if(!member) {
            message.reply('Bad Argument');
            return;
        }

        if(!reason) reason = translate('warnDefaultReason');

        message.reply(translate('warnMessage')
            .replace('$member', member.user.globalName ?? member.user.username)
            .replace('$reason', reason));

        this.addSanction('Warn', member.id, message.author.id, message.guild?.id as string, reason);
    }

    //Customs functions
    addSanction(sanction: string, memberID: string, authorID: string, guildID: string, reason: string) {
        let data = Object.values({ sanction, memberID, authorID, guildID, reason, date: performance.now() });
        databaseClient.prepare(`
            INSERT INTO sanctions (sanction, memberID, authorID, guildID, reason, date) VALUES (?, ?, ?, ?, ?, ?);
        `).run(...data);
        redisClient.hSet(`sanctions/${guildID}/${memberID}`, data);
    }
}   