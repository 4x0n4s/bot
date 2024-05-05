import Client from './';
import { ClientUser } from "./typings";

const client = new Client();

client.connect('MTIyMjk1NDYxNTQ3NDIyOTM0OQ.GJTRMy.96-BGZVOuXtmWVV_6qmNPGvd2YMbWQRAo1IJuw');

client.on('connected', async () => {
    console.log(client.user.ID);
});