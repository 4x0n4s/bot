import * as dotEnvExtended from 'dotenv-extended';
import 'module-alias/register';

let env = dotEnvExtended.load()

import { Bot } from '@lib/index';
import DatabaseClient from './Database';
import Gateway from './ws/WebSocket';

global.Main = new Bot({
    dev: env.MODE,
    slashCommands: true,
    token: env.TOKEN
});

global.databaseClient = new DatabaseClient();
global.gateway = new Gateway();