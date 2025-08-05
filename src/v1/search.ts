type FilterOperator = 'eq' | 'neq' | 'like' | 'nlike' | 'gt' | 'gte' | 'lt' | 'lte';

type FilterCondition<F extends string> = {
    property: F;
    operator: FilterOperator;
    value: string;
};

type FilterCombination<F extends string> = {
    mode: 'and' | 'or';
    items: Filter<F>[];
};

type Filter<F extends string> = FilterCondition<F> | FilterCombination<F>;

type SortDirection = 'asc' | 'desc';

type SortEntry<S extends string> = {
    property: S;
    direction: SortDirection;
};

export type Sort<S extends string> = SortEntry<S>[];

export type SearchRequest<F extends string, S extends string> = {
    filters?: Filter<F>[];
    sort?: Sort<S>[];
    limit?: number;
    offset?: number;
}