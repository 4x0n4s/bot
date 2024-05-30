import { 
    Client, 
    Message 
} from '@lib/index';
import Base from '@lib/functions/Base';

export class Context extends Base {
    constructor (
        client: Client, 
        message: Message
    ) {
        super();
    }
}