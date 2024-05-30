import Bot from 'src/Bot';
import DatabaseClient from 'src/Database';
import redisClient from 'src/Redis';
//import Server from 'src/functions/WebSocket';

import * as dotEnvExtended from 'dotenv-extended';
let env = dotEnvExtended.load();

global = {
    ...global,
    databaseClient: new DatabaseClient(),
    redisClient,
    Main: new Bot({ dev: env.MODE, token: env.TOKEN })
}