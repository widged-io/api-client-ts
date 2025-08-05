import { EventsApi } from "./events/events-api.js";
import { RecordsApi } from "./records/records-api.js";
import { errors } from "./errors.js";

export class ClientV1 {
    public readonly events: EventsApi;
    public readonly records: RecordsApi;
    public readonly errors = errors;

    constructor(
        apiKey: string,
        baseUrl: string,
    ) {
        const v1BaseUrl = new URL('/v1', baseUrl);

        this.events = new EventsApi(apiKey, v1BaseUrl.href);
        this.records = new RecordsApi(apiKey, v1BaseUrl.href);
    }
}
