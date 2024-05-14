import Bot from 'src/Bot';
import DatabaseClient from 'src/Database';
import Server from 'src/gateway/WebSocket';

import * as dotEnvExtended from 'dotenv-extended';
let env = dotEnvExtended.load();

export default new Bot({
    dev: env.MODE,
    token: env.TOKEN,
})

export const gateway = new Server();
export const databaseClient = new DatabaseClient();