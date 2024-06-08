import Bot from './Bot';
import DatabaseClient from './Database';
//import redisClient from './Redis';
//import Server from 'src/functions/WebSocket';

import * as dotEnvExtended from 'dotenv-extended';
let env = dotEnvExtended.load();

global.databaseClient = new DatabaseClient()
//global.redisClient = redisClient
global.Main = new Bot({ dev: env.MODE, token: env.TOKEN });