import { Message, ActionRowData, MessageActionRowComponentData, User, ComponentType } from 'discord.js';
import type { APIEmbed } from 'discord-api-types/v10';
import { defaultColor, defaultPrefix } from '@lib/utilities/Constants';
import { Command } from '@lib/decorators';
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
        
        let embed: APIEmbed = {
            author: { name: message.author.username, icon_url: message.author?.avatarURL() ?? undefined },
            color: defaultColor     
        };
        
        if (commandName) {
            let command = Main.manager.commands.get(commandName);
            if(command) {
                message.reply({ 
                    embeds: [{
                        ...embed,
                        title: command.name,
                        fields: command.description
                            .map(description => ({ name: `\`\`${defaultPrefix + description[0]}\`\``, value: description[1] })),
                        footer: { text: `${command.name} - ${command.list}` },
                    }]
                });
                return;
            }
        }

        let page = 0;
        const lists = ['Moderation', 'Protection', 'Utilities', 'Logs', 'Economy', 'Test'] as ListsData[];
        const commands = Main.manager.commands.all();
    
        function Embed(list: string) {
            return {
                ...embed,
                title: list,
                fields: commands
                    ?.filter(command => command.list === list)
                    .map(command => command.description)
                    .flatMap(descriptions => descriptions)
                    .map(description => ({ name: `\`\`${defaultPrefix + description[0]}\`\``, value: description[1] })),
                footer: { text: `${list} - ${commands?.length}` },
            } as APIEmbed;
        }
     
        const components: ActionRowData<MessageActionRowComponentData>[] = [{
            type: 1,
            components: [{
                type: 3,
                customId: 'help',
                options: lists.map(list => ({ label: list, value: list }))
            }],
        }];

        const m = await message.reply({ embeds: [Embed(lists[page])], components });
        m.createMessageComponentCollector({
            componentType: ComponentType.StringSelect,
            time: 60000,
            filter: (interaction) => interaction.user.id === message.author.id && interaction.customId === 'help'
        }).on('collect', interaction => {
            interaction.deferUpdate();
            const list = lists.find(list => list === interaction.values[0]) as string;
            m.edit({ embeds: [Embed(list)] });
        }).on('end', () => m.edit({ components: [] }));
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
            await Main.users.fetch(message.content
                    .trim()
                    .split(' ')[1])
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
            await Main.users.fetch(message.content
                    .trim()
                    .split(' ')[1])
                .then(u => user = u)
                .catch(() => user = message.author);
        }

        let embeds: APIEmbed[] = [{
            title: `${user.globalName} avatar's`,
            image: { 
                url: user.avatarURL({ extension: 'png' }) as string
            },
            color: defaultColor
        }];

        message.reply({ embeds });
    }
}   