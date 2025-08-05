import { APIError, NetworkError } from "./errors.js";

type ErrorResponse = {
    error: string;
    message: string;
    tree?: any;
}

export class BaseApi {
    static TIMEOUT = 15_000;

    constructor(
        private readonly apiKey: string,
        private readonly baseUrl: string,
    ) {}

    protected async request<T>(method: string, path: string, body?: unknown): Promise<T> {
        const url = new URL(path, this.baseUrl);

        let response: Response;

        try {
            response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Client': 'widged.io/api-client-ts',
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: AbortSignal.timeout(BaseApi.TIMEOUT),
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new NetworkError(error.message);
            }

            throw new NetworkError('Unknown error');
        }

        if (!response.ok) {
            const error = await response.json() as ErrorResponse;

            throw new APIError(error.error, error.message, error.tree);
        }

        return response.json() as Promise<T>;
    }
}