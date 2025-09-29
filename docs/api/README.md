# SiteFlow API v1 Documentation

## Overview
SiteFlow API v1 provides comprehensive CRUD operations for construction project management with Role-Based Access Control (RBAC).

## API Structure

### Main Documentation File
- `openapi-main.yaml` - Main OpenAPI specification file

### Modular Structure
- `paths/` - Individual endpoint definitions
  - `index.yaml` - Path references
  - `projects.yaml` & `projects-id.yaml` - Project endpoints
  - `categories.yaml` & `categories-id.yaml` - Category endpoints
  - `tasks.yaml` & `tasks-id.yaml` - Task endpoints
  - `daily-logs.yaml` & `daily-logs-id.yaml` - Daily log endpoints
  - `daily-log-tasks.yaml` & `daily-log-tasks-id.yaml` - Daily log task endpoints
  - `transactions.yaml` & `transactions-id.yaml` - Transaction endpoints
  - `share-links.yaml` & `share-links-id.yaml` - Share link endpoints
  - `media-assets.yaml` & `media-assets-id.yaml` - Media asset endpoints

- `schemas/` - Data models and request/response schemas
  - `index.yaml` - All schema definitions

- `responses/` - Common response templates
  - `index.yaml` - Standard error responses

## Features

### ✅ Complete CRUD Operations
All 8 entities support:
- **GET** `/entity` - List with cursor pagination
- **POST** `/entity` - Create new record
- **GET** `/entity/{id}` - Get by ID
- **PATCH** `/entity/{id}` - Update record
- **DELETE** `/entity/{id}` - Soft delete

### ✅ RBAC Security
- All routes require authentication
- Role-based permissions (OWNER, ADMIN, PM, ENGINEER, ACCOUNTANT, VIEWER)
- Organization context isolation

### ✅ Data Validation
- Zod schema validation for all inputs
- RFC7807 Problem JSON error responses
- Type-safe request/response models

### ✅ Pagination
- Cursor-based pagination
- Configurable limit (1-100)
- Consistent pageInfo response format

### ✅ Soft Delete
- All entities support soft delete (deletedAt timestamp)
- Deleted records filtered from list endpoints
- Audit trail preservation

## Entities

1. **Projects** - Main construction projects
2. **Categories** - Project work categories
3. **Tasks** - Individual work items
4. **Daily Logs** - Daily site reports
5. **Daily Log Tasks** - Task status in daily logs
6. **Transactions** - Financial transactions
7. **Share Links** - Public sharing links
8. **Media Assets** - File attachments

## Usage

### View Documentation
```bash
# Use any OpenAPI viewer (Swagger UI, Redoc, etc.)
# Point to: docs/api/openapi-main.yaml
```

### Authentication
All endpoints require Bearer token authentication:
```
Authorization: Bearer <your-jwt-token>
```

### Example Request
```bash
curl -X GET "http://localhost:3000/api/v1/projects" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json"
```

### Example Response
```json
{
  "ok": true,
  "items": [],
  "pageInfo": {
    "hasMore": false,
    "nextCursor": null
  }
}
```

## Error Handling
All errors follow RFC7807 Problem JSON format:
```json
{
  "type": "about:blank",
  "title": "Validation Error",
  "status": 422,
  "detail": "Invalid input data",
  "issues": []
}
```
