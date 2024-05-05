import { Bot } from '@lib/index';
import DatabaseClient from './Database';
import Server from './server/';

import * as dotEnvExtended from 'dotenv-extended';
import 'module-alias/register';

let env = dotEnvExtended.load()


global.Main = new Bot({
    dev: env.MODE,
    token: env.TOKEN
});
global.databaseClient = new DatabaseClient();
global.gateway = Server;