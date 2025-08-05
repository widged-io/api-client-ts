export class NetworkError extends Error {
    override name = 'NetworkError';
}

export class APIError extends Error {
    tree?: any;

    constructor(name: string, message: string, tree?: any) {
        super(message);
        this.name = name;
        this.tree = tree;
    }
}

export const errors = {
    NetworkError,
    APIError,
} as const;