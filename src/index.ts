import * as dotEnvExtended from 'dotenv-extended';
import 'module-alias/register';

let env = dotEnvExtended.load()

import { Bot, DatabaseClient } from '@lib/index';

global.Main = new Bot({
    dev: env.MODE,
    slashCommands: true,
    token: env.TOKEN
});

global.databaseClient = new DatabaseClient();