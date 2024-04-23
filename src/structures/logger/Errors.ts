import Undici from "undici";
import { Console } from "console";
import { DiscordApiEndpoint } from "../../constants";

export default class Errors extends Console {
    constructor (useWhebook: boolean) {
        const { stdout, stderr} = process;
        super({
            stdout, stderr
        });

        this.useWhebook = useWhebook;
    }
    
    private useWhebook: boolean;
    private async sendWebhhook (data: string) {
        if(this.useWhebook) {
            await Undici.request(DiscordApiEndpoint + '/webhooks/{webhook.id}/{webhook.token}', {
                body: JSON.stringify(''),
                method: "POST"
            })
        }
    }
}