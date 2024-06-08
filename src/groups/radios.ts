import { createAudioPlayer, joinVoiceChannel, createAudioResource } from '@discordjs/voice';
import { Command } from '@decorators';
import { Message } from 'discord.js';

export default class {
    /*
    [Protect/AntiRaid Commands]
    */

    @Command({
        name: 'join',
        description: [['', '']],
        arguments: [],
        list: 'Test'
    })
    async radio_command(message: Message, args: {}, translate: (t: string) => string) { 
        const VoiceConnection = joinVoiceChannel({
            channelId: '1229149646644056074',
            guildId: '1223659401097773126',
            adapterCreator: vfgr
        });

        const mp3 = createAudioResource('http://cdn.nrjaudio.fm/audio1/fr/40101/aac_576.mp3'); 
        const player = createAudioPlayer();
        VoiceConnection.subscribe(player);

        
        player.play(mp3);
        player.on('error', (error) => {
            console.error('Erreur lors de la lecture du fichier audio :', error.message);
        });
    }
}   