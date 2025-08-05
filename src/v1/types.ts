export type TypedId<T extends string> = `${T}_${string}` & { readonly __brand: unique symbol };

export type PaginatedResponse<T> = {
    objects: T[];
    total: number;
}