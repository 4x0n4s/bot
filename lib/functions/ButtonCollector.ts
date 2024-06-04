import { ButtonCollectorType } from '@lib/typings';
import { Client, Message } from '@lib/index';

type ButtonInteraction = Message;
export default class ButtonCollector implements ButtonCollectorType {
    private _client: Client;
    private callback!: (interaction: ButtonInteraction) => void;
    customsIDs: array;
    usersIDs: array;
    autoUpdate: boolean;
    constructor(client: Client, {
        customsIDs = [],
        usersIDs = [],
        autoUpdate = false
    }: {
        customsIDs: string | array,
        usersIDs: string | array,
        autoUpdate?: boolean
    }) {
        this._client = client;
        this.customsIDs = Array.isArray(customsIDs) ? customsIDs : [customsIDs];
        this.usersIDs = Array.isArray(usersIDs) ? usersIDs : [usersIDs];
        this.autoUpdate = autoUpdate;
    }
    
    setCallback(fn: (interaction: ButtonInteraction) => void): this {
        this.callback = fn;
        return this;
    }
    
    private async handleInteraction(interaction: any) {
        if(!this.callback) {
            return;
        }
        
        const { user, customID } = interaction;
        
        const u = this.usersIDs.length > 0 ? this.usersIDs?.includes(user.id) : true;
        const c = this.customsIDs?.length > 0 ? this.customsIDs?.includes(user.id) : true;
        
        if(u && c) {
            this.callback(interaction);
        }
    }
}

//@ts-ignore
new ButtonCollector(Main, {
    customsIDs: ['customID1', 'customID2'],
    usersIDs: '123456789', // ['']
}).setCallback(interaction => {
    //Callback
});