# @widged.io/api-client-ts

A TypeScript client for the [widged.io](https://widged.io/) API. This package provides a strongly-typed interface for interacting with widged.io's data collection and analytics services.

More details can be found in the [documentation](https://docs.widged.io/api).

## Getting started

```console
npm i @widged.io/api-client-ts
```

## Usage

```typescript
import { widged } from '@widged.io/api-client-ts';

// Initialize the client with your API key
const client = new widged.Client('your-api-key-here');

// Access v1 API endpoints
const v1 = client.v1;
```

## API Structure

The client is organized by API versions. Currently, only v1 is available:

### Events API

Query and retrieve event data collected from your widgets:

```typescript
// Search for events with filters
const events = await client.v1.events.search({
    filters: [
        {
            property: 'widgetId',
            operator: 'eq',
            value: 'your-widget-id'
        }
    ],
    limit: 10,
    offset: 0
});

// Get a specific event by ID
const event = await client.v1.events.getById('evt_123456');
```

### Records API

Query and retrieve record data collected from your widgets:

```typescript
// Search for records with filters
const records = await client.v1.records.search({
    filters: [
        {
            property: 'widgetId',
            operator: 'eq',
            value: 'your-widget-id'
        }
    ],
    sort: [
        {
            property: 'createdAt',
            direction: 'desc'
        }
    ],
    limit: 20
});

// Get a specific record by ID
const record = await client.v1.records.getById('rec_123456');
```

## Search and Filtering

Both Events and Records APIs support advanced search functionality:

### Filter Operators

- `eq` - Equal
- `neq` - Not equal
- `like` - Like (pattern matching)
- `nlike` - Not like
- `gt` - Greater than
- `gte` - Greater than or equal
- `lt` - Less than
- `lte` - Less than or equal

### Filterable Properties

**Events:**
- `id` - Event ID
- `createdAt` - Creation timestamp
- `sessionId` - Session ID
- `pageloadId` - Page load ID
- `leadId` - Lead ID
- `name` - Event name

**Records:**
- `id` - Record ID
- `createdAt` - Creation timestamp
- `sessionId` - Session ID
- `pageloadId` - Page load ID
- `leadId` - Lead ID
- `data` - Record data
- `data.${string}` - Nested data properties
- `partition` - Data partition

### Sortable Properties

Both APIs support sorting by:
- `createdAt` - Creation timestamp

### Complex Filters

You can combine filters using AND/OR logic:

```typescript
const complexSearch = {
    filters: [
        {
            mode: 'and',
            items: [
                {
                    property: 'widgetId',
                    operator: 'eq',
                    value: 'widget-123'
                },
                {
                    property: 'createdAt',
                    operator: 'gte',
                    value: '2024-01-01T00:00:00Z'
                }
            ]
        }
    ]
};
```

## Data Types

### Typed IDs

The API uses strongly-typed IDs for different entities:

- `TypedId<'evt'>` - Event IDs (e.g., `evt_123456`)
- `TypedId<'rec'>` - Record IDs (e.g., `rec_123456`)
- `TypedId<'ses'>` - Session IDs (e.g., `ses_123456`)
- `TypedId<'pgld'>` - Page load IDs (e.g., `pgld_123456`)
- `TypedId<'lead'>` - Lead IDs (e.g., `lead_123456`)

You can read more about widged IDs [here](https://docs.widged.io/ids).

### Paginated Responses

Search operations return paginated results:

```typescript
type PaginatedResponse<T> = {
    objects: T[];
    total: number;
}
```

## Error Handling

The client provides specific error types for different failure scenarios:

```typescript
import { widged } from '@widged.io/api-client-ts';

const client = new widged.Client('...');

try {
    const events = await client.v1.events.search({});
} catch (error) {
    if (error instanceof client.v1.errors.NetworkError) {
        // Handle network connectivity issues
        console.error('Network error:', error.message);
    } else if (error instanceof client.v1.errors.APIError) {
        // Handle API-specific errors
        console.error('API error:', error.name, error.message);
    }
}
```

### Error Types

- `NetworkError` - Network connectivity issues
- `APIError` - API-specific errors with additional context

## Configuration

The client uses the following default configuration:

- **Base URL**: `https://api.widged.io`
- **Timeout**: 15 seconds

## TypeScript Support

This package is written in TypeScript and provides full type safety for all API operations, including:

- Strongly-typed request/response objects
- Typed IDs for different entities
- Type-safe filter and sort operations
- Error types
