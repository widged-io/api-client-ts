import { PaginatedResponse, TypedId } from '../../v1/types.js';
import { SearchRequest } from '../search.js';
import { BaseApi } from '../../v1/base-api.js';

type Filterable = 'id' | 'createdAt' | 'sessionId' | 'pageloadId' | 'leadId' | 'data' | `data.${string}` | 'partition';
type Sortable = 'createdAt';

type CollectedRecord = {
    id: TypedId<'rec'>;
    createdAt: string;
    widgetId: string;
    sessionId: TypedId<'ses'>;
    pageloadId: TypedId<'pgld'>;
    leadId: TypedId<'lead'>;
    partition: string;
    data: Record<string, string>;
};

export class RecordsApi extends BaseApi {
    async search(request: SearchRequest<Filterable, Sortable>) {
        return this.request<PaginatedResponse<CollectedRecord>>('POST', '/records/search', request);
    }

    async getById(id: TypedId<'rec'>) {
        return this.request<CollectedRecord>('GET', `/records/${id}`);
    }
}
