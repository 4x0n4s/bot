import { GuildMember, Message } from 'discord.js';
import { Command } from '@lib/functions/decorators';

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
            DELETE FROM sanctions
            WHERE memberID = ?
            RETURNING *
        `).all(member.id).length;
 
        let reply = (t: string) => translate(t) // #length
            .replaceAll('#length', String(length));
        
        message.reply(reply('clearSanctionsMessage'));
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

        let length = members.length;
        if(!reason) reason = translate('banDefaultReason');

        members.forEach(member => member.ban({ reason })
            .then(member => this.addSanction('Ban', member.id, message.author.id, message.guild?.id as string, reason))
            .catch(() => length--)
        );

        let reply = (t: string) => translate(t) // #length, #reason
            .replaceAll('#length', String(length))
            .replaceAll('#reason', reason);
        
        await message.reply(reply('banMessage'));
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

        let length = members.length;
        if(!reason) reason = translate('kickDefaultReason');
        members.forEach(member => member.kick(reason)
            .then(member => this.addSanction('Kick', member.id, message.author.id, message.guild?.id as string, reason))
            .catch(() => length--)
        );

        let reply = (t: string) => translate(t) // #length, #reason
            .replaceAll('#length', String(length))
            .replaceAll('#reason', reason)
    
        await message.reply(reply('kickMessage'));
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

        let h = databaseClient.query(`
            DELETE FROM sanctions
            WHERE ID = ?
            AND memberID = ?
            AND guildID = ?;
            RETURNING *;
        `).get(warnID,  member.id, message.guild?.id as string);

        if(!h) {
            return;
        }

        let reply = (t: string) => translate(t) // #warnID, #member
            .replaceAll('#member', `${member}`)
            .replaceAll('#warnID', String(warnID));

        message.reply(reply('deleteSanctionMessage'));
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

        const reply = (t: string) => translate(t) // #member, #reason
            .replaceAll('#member', `${member}`)
            .replaceAll('#reason', reason);
        
        message.reply(reply('warnMessage'));
        this.addSanction('Warn', member.id, message.author.id, message.guild?.id as string, reason);
    }

    //Customs functions
    addSanction(sanction: string, memberID: string, authorID: string, guildID: string, reason: string) {
        databaseClient.prepare(`
            INSERT INTO sanctions
            (sanction, memberID, authorID, guildID, reason, date)
            VALUES (?, ?, ?, ?, ?, ?);
        `).run(sanction, memberID, authorID, guildID, reason, Date.now());
    }
}   