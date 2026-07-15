# Team API Documentation

This document provides comprehensive documentation for all Team-related APIs in the system.

## 1. Create Team
**Endpoint:** `POST /team`

**Description:** Creates a new team with the specified name and description.

**Request Body:**
```json
{
  "name": "Team Name",
  "description": "Team description"
}
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "Team Name",
  "description": "Team description",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/team \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Engineering Team",
    "description": "Team responsible for backend development"
  }'
```

**Example Response:**
```json
{
  "_id": "640012345678901234567890",
  "name": "Engineering Team",
  "description": "Team responsible for backend development",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---
## 2. Get Team
**Endpoint:** `GET /team/:id`

**Description:** Retrieves a team by its ID.

**Request Parameters:**
```
id (string): Team ID
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "Team Name",
  "description": "Team description",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/team/640012345678901234567890
```

**Example Response:**
```json
{
  "_id": "640012345678901234567890",
  "name": "Engineering Team",
  "description": "Team responsible for backend development",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---
## 3. Update Team
**Endpoint:** `PUT /team/:id`

**Description:** Updates an existing team by its ID.

**Request Parameters:**
```
id (string): Team ID
```

**Request Body:**
```json
{
  "name": "Updated Team Name",
  "description": "Updated team description"
}
```

**Response:**
```json
{
  "_id": "ObjectId",
  "name": "Updated Team Name",
  "description": "Updated team description",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/team/640012345678901234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Engineering Team",
    "description": "Updated team responsible for backend development"
  }'
```

**Example Response:**
```json
{
  "_id": "640012345678901234567890",
  "name": "Updated Engineering Team",
  "description": "Updated team responsible for backend development",
  "createdAt": "2023-01-01T00:00:00.000Z",
  "updatedAt": "2023-01-01T00:00:00.000Z"
}
```

---
## 4. Delete Team
**Endpoint:** `DELETE /team/:id`

**Description:** Deletes a team by its ID.

**Request Parameters:**
```
id (string): Team ID
```

**Response:**
No response body on success.

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/team/640012345678901234567890
```

---
## 5. Get All Teams
**Endpoint:** `GET /team`

**Description:** Retrieves all teams in the system.

**Response:**
```json
[
  {
    "_id": "ObjectId",
    "name": "Team Name",
    "description": "Team description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  {
    "_id": "ObjectId",
    "name": "Team Name",
    "description": "Team description",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/team
```

**Example Response:**
```json
[
  {
    "_id": "640012345678901234567890",
    "name": "Engineering Team",
    "description": "Team responsible for backend development",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  {
    "_id": "640012345678901234567891",
    "name": "Frontend Team",
    "description": "Team responsible for frontend development",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

---
## Error Handling

All endpoints follow the standard error response format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Common error codes:
- `TEAM_NOT_FOUND`: Team not found (404)
- `VALIDATION_ERROR`: Request validation failed (400)