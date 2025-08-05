import { PaginatedResponse, TypedId } from '../../v1/types.js';
import { SearchRequest } from '../search.js';
import { BaseApi } from '../../v1/base-api.js';

type Filterable = 'id' | 'createdAt' | 'sessionId' | 'pageloadId' | 'leadId' | 'name';
type Sortable = 'createdAt';

type Event = {
    id: TypedId<'evt'>;
    createdAt: string;
    widgetId: string;
    sessionId: TypedId<'ses'>;
    pageloadId: TypedId<'pgld'>;
    leadId: TypedId<'lead'>;
    partition: string;
    data: Record<string, string>;
};

export class EventsApi extends BaseApi {
    async search(request: SearchRequest<Filterable, Sortable>) {
        return this.request<PaginatedResponse<Event>>('POST', '/events/search', request);
    }

    async getById(id: TypedId<'evt'>) {
        return this.request<Event>('GET', `/events/${id}`);
    }
}
