import Base from 'lib/functions/Base';
import { 
    Client, 
    Message 
} from 'lib/index';

export default class Context extends Base {
    constructor (private client: Client, public message: Message) {
        super();
    }
}