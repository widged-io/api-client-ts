import { ClientV1 } from "./v1/client.js";

export class Client {
    public readonly v1: ClientV1;
    static BASE_URL = 'https://api.widged.io';

    constructor(
        apiKey: string,
    ) {
        this.v1 = new ClientV1(apiKey, Client.BASE_URL);
    }
}