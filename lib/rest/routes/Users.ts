import { } from 'discord-api-types/v10';
import { Endpoints } from 'lib/utilities/Constants';
import { Client } from 'lib/index';
import RESTManager from 'lib/rest/RESTManager';
import { request } from "undici";

export default class Users {
    constructor(private client: Client, private restManager: RESTManager) {

    }
}