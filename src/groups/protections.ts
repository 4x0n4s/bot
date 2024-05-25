import { HelperData, HelperUpdateData } from '@typings';
import { APIEmbed, APIActionRowComponent, APIMessageActionRowComponent, APISelectMenuOption, APIBaseSelectMenuComponent, ComponentType, APIBaseComponent } from 'discord-api-types/v10';
import { Endpoints, defaultColor } from 'lib/utilities/Constants';
import { Command, Event } from '@decorators';
import { Message, StringSelectMenuInteraction } from 'discord.js';
import { request } from 'undici';

export default class {
    /*
    [Protect/AntiRaid Commands]
    */

    @Command({
        name: 'helpers',
        arguments: [{ id: 'helperIdentifer', type: 'string', required: false }],
        description: [['test', 'test']],
        list: 'Test'
    })
    async test(message: Message, args: {
        helperIdentifer: string | null
    }) {
        let { helperIdentifer } = args;

        let embeds: APIEmbed[];
        let components: APIActionRowComponent<APIMessageActionRowComponent>[];

        let { datas: helpers } = Main.helpers;
        let helper = helpers.find(h => h.ID.toString() === helperIdentifer ?? h.helperName === helperIdentifer) ?? { ID: (helpers.at(-1)?.ID ?? 0) + 1, helperName: helperIdentifer } as HelperData;

        console.log(helperIdentifer)
        helperIdentifer ? main(helper) : helpersList();

        // @ts-ignore
        const m = await message.reply({ embeds, components });
        m.createMessageComponentCollector({
            componentType: 3,
            filter: i => i.user.id === message.author.id
        }).on('collect', async interaction => {
            interaction.deferUpdate();
            let { customId, values, channel } = interaction;
            let value = values[0];

            if(customId.startsWith('editHelper/')) {
                let messagesCollector = channel?.createMessageCollector({
                    filter: m => m.author.id === message.author.id,
                    max: 1
                })?.on('end', () => {
                    messagesCollector?.removeAllListeners();
                });

                await channel?.sendTyping();
                switch (value) {
                    case 'token':
                        const qm1 = await channel?.send('Quel sera le token de cet helper?'); 
                        messagesCollector?.on('collect', arg => {
                            for (const x of [arg, qm1]) x?.delete();
                            let token = arg?.content as string;
                            request(Endpoints.API + '/users/@me', {
                                headers: {
                                    'Content-Type': 'application/json', 'Authorization': `Bot ${token}`
                                }
                            }).then(async ({ body, statusCode }) => {
                                const json = await body.json() as any;
                                if(statusCode !== 200) {
                                   interaction.followUp({ content: 'Le token spécifié est invalide', ephemeral: true });
                                   return;
                                } 
                                helper['token'] = token;
                                helper['botID'] = json.id;
                                main(helper);
                                interaction.message.edit({ embeds, components });
                                Main.helpers.setHelper(helper.ID.toString(), helper);
                            });
                        });
                        break;

                    case 'helper name':
                        helper['helperName']
                        const qm2 = await channel?.send(`Quel sera le ${helper['helperName'] ? 'nouveau' : ''} nom de cet helper?`);

                        messagesCollector?.on('collect', arg => {
                            for (const x of [arg, qm2]) x?.delete();
                            let helperName = arg?.content as string;

                            helper['helperName'] = helperName;

                            main(helper);
                            interaction.message.edit({ embeds, components });
                            Main.helpers.setHelper(helper.ID.toString(), helper);
                        });
                        break;
                }
            } else if(customId.startsWith('manageHelper/')) {
                switch (value) {
                    case 'delete':
                        Main.helpers.delete(helper.ID.toString());
                        helpers = Main.helpers.getHelpers();
                        helpersList();
                        interaction.message.edit({ embeds, components });
                        break;
                }
            } else if(customId === 'helpers') {
                helpers =  Main.helpers.getHelpers();
                helper =  Main.helpers.getHelper(value) as HelperData;
                if (!helper) helper = { ID: (helpers.at(-1)?.ID ?? 0) + 1 } as HelperData;
                main(helper);
                interaction.message.edit({ embeds, components });
            } 
        });

        m.createMessageComponentCollector({
            componentType: 2,
            filter: i => i.user.id === message.author.id && ['backtohelpers'].includes(i.customId)
        }).on('collect', interaction => {
            interaction.deferUpdate();
            helpers = Main.helpers.getHelpers();
            helpersList();
            interaction.message.edit({ embeds, components });
        });

        function main(helper: HelperData) {
            embeds = [{
                title: 'Helpers',
                description: `\`\`\`${[
                    `Helper ID: ${helper['ID'].toString()}`, `Helper Name: ${helper['helperName'] ?? 'None'}`,
                    `Bot ID: ${helper['botID'] ?? 'None'}`, `Token: ${helper['token'] ? `${helper['token'].substring(0, 12)}...` : 'None'}`
                ].join(',\n')}\`\`\``,
                color: defaultColor
            }];

            components = [{
                type: 1,
                components: [{
                    type: 3,
                    placeholder: 'Edit',
                    custom_id: `editHelper`,
                    options: ['Helper Name', 'Token'].map<APISelectMenuOption>(key => ({ label: `Edit ${key}`, value: key.toLowerCase() }))
                }]
            }, {
                type: 1,
                components: [{
                    type: 3,
                    placeholder: 'Manage',
                    custom_id: `manageHelper`,
                    options: ['Delete', 'Start', 'Restart', 'Stop'].map<APISelectMenuOption>(key => ({ label: key, value: key.toLowerCase() }))
                }]
            },{
                type: 1,
                components: [{
                    type: 2,
                    custom_id: 'backtohelpers',
                    style: 2,
                    label: 'Back'
                }]
            }];
        }

        function helpersList() {
            embeds = [{
                title: 'Helpers',
                color: defaultColor
            }];
            components = [{
                type: 1,
                components: [{
                    type: 3,
                    placeholder: 'Helpers',
                    custom_id: 'helpers',
                    options: [
                        ...helpers?.map(({ helperName, ID }, i) => ({ label: `${i + 1} - ${helperName?.charAt(0).toUpperCase() + helperName?.slice(1)}`, value: ID.toString() })), 
                        { label: 'Configurer un Helper', value: 'createhelper' }
                    ]
                }]
            }];
        }
    }
}   