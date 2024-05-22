import Bot from 'src/Bot';
import DatabaseClient from 'src/Database';
//import Server from 'src/functions/WebSocket';

import * as dotEnvExtended from 'dotenv-extended';
let env = dotEnvExtended.load();

global.databaseClient =  new DatabaseClient();
global.Main = new Bot({
    dev: env.MODE,
    token: env.TOKEN,
});

//global.gateway =  new Server();