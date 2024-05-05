import type { Message, ActionRowData, MessageActionRowComponentData, User } from 'discord.js';
import { ComponentType, cleanContent } from 'discord.js';
import type { APIEmbed } from 'discord-api-types/v10';
import { defaultColor, defaultPrefix } from '@lib/utils/Contants';
import { Command } from '@lib/functions/decorators';
import { ListsData } from '@typings';

export default class {
    /*
    [Infos Commands]
    */

    @Command({
        name: 'help', 
        arguments: [{ id: 'commandName', type: 'string' }], 
        description: [['help', 'Show a list of commands'], ['help <commandName>', 'Show informations about a command ']],
        list: 'Information'
    })
    async help_command(message: Message, args: { commandName: string }) {
        let { commandName } = args;

        if (commandName) {
            let command = global.Main.commandsManager.commands.get(commandName);
            if(command) {
                message.reply({ 
                    embeds: [{
                        title: command.name,
                        author: { name: message.member?.user.globalName as string, icon_url: message.member?.avatarURL() as string,},
                        description: ``,
                        fields: command.description
                            .map(description => ({ name: `\`\`${defaultPrefix + description[0]}\`\``, value: description[1] })),
                        footer: {
                            text: `${command.name} - ${command.list}`
                        },
                        color: defaultColor
                    }]
                });
                return;
            }
        }

        const commands = global.Main.commandsManager.commands.all();
        let page = 0;
        const lists = ['Test', 'Moderation', 'Utilities', 'Logs'] as ListsData[];

        function Embed(list: string) {
            const embed: APIEmbed = {
                title: list,
                author: { name: message.member?.user.globalName as string, icon_url: message.member?.avatarURL() as string,},
                fields: commands
                    ?.filter(command => command.list === list)
                    .map(command => command.description)
                    .flatMap(descriptions => descriptions)
                    .map(description => ({ name: `\`\`${defaultPrefix + description[0]}\`\``, value: description[1] })),
                footer: {
                    text: `${list} - ${commands?.length}`
                },
                color: defaultColor
            }
            return embed;
        }
     
        const components:ActionRowData<MessageActionRowComponentData>[] = [{
            type: 1,
            components: [{
                type: 3,
                customId: 'help',
                options: lists.map(list => ({ label: list, value: list }))
            }],
        }];

        const m = await message.reply({
            embeds: [Embed(lists[page])],
            components
        });
        
        m.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000,
            filter: (ctx) => ctx.user.id === message.author.id && ctx.customId === 'help'
        }).on('collect', async ctx => {
            ctx.deferUpdate();
            const list = String(lists
                .find(list => list === ctx.values[0]));
            m.edit({
                embeds: [Embed(list)]
            });
        }).on('end', async (_, r) => {
            m.edit({ components: [] });
        });

    }

    @Command({
        name: 'banner',
        arguments: [{ id: 'user', type: 'user' }],
        description: [['banner <user>', 'pic']],
        list: 'Information',
    })
    async banner_command(message: Message, args: { user: User }) {
        let { user } = args;

        if(!user) {
            await global.Main.users.fetch(message.content
                    .trim()
                    .split(' ')
                    .filter(m => m.length > 0)[1])
                .then(u => user = u)
                .catch(() => user = message.author);
        }

        if(!user.banner) {
            return;
        }

        let embed: APIEmbed = {
            title: `${user.globalName} banner's`,
            image: { 
                url: user.bannerURL({ extension: 'png' }) as string
            },
            color: defaultColor
        }

        message.reply({
            embeds: [embed]
        });
    }

    @Command({
        name: 'pic',
        arguments: [{ id: 'user', type: 'user' }],
        description: [['pic <user>', 'pic']],
        list: 'Information',
    })
    async pic_command(message: Message, args: { user: User }) {
        let { user } = args;

        if(!user) {
            await global.Main.users.fetch(message.content
                    .trim()
                    .split(' ')
                    .filter(m => m.length > 0)[1])
                .then(u => user = u)
                .catch(() => user = message.author);
        }

        let embed: APIEmbed = {
            title: `${user.globalName} avatar's`,
            image: { 
                url: user.avatarURL({ extension: 'png' }) as string
            },
            color: defaultColor
        }

        message.reply({
            embeds: [embed]
        });
    }
}   