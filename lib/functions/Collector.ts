import { CollectorSettings } from 'lib/typings';
import { 
    Client, 
    Message 
} from 'lib/index';
import EventEmitter from 'events';

export default class Collector extends EventEmitter{
    constructor(private client: Client, private message: Message, { time = null, filter = () => true }: CollectorSettings) {
        super();
        client.on('interactionCreate', (interaction) => {
            if(filter(interaction)) {
                this.emit('collected', interaction);
            }
        });
    }

    private preHandler() {
       
    }

}