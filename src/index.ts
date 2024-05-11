import { Bot } from 'lib/index';
import DatabaseClient from 'src/Database';
import Server from 'src/server/';

import * as dotEnvExtended from 'dotenv-extended';
let env = dotEnvExtended.load();

global.Main = new Bot({
    dev: env.MODE,
    token: env.TOKEN
});
global.databaseClient = new DatabaseClient();
global.gateway = Server;