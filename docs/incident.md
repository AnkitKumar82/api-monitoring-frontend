# Incident API Documentation

This document provides comprehensive documentation for all Incident-related APIs in the system.

## 1. List Incidents
**Endpoint:** `GET /incidents`

**Description:** Retrieves a list of incidents with optional filtering and pagination.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Request Parameters (Query String):**
```
page: number (optional, default: 1)
limit: number (optional, default: 10)
status: string (optional)
severity: string (optional)
endpointId: string (optional)
from: string (optional) - Date in ISO format
to: string (optional) - Date in ISO format
sort: string (optional) - Format: "field direction" where direction is "ASC" or "DESC", default: "startedAt DESC"
```

**Response:**
```json
{
  "data": [
    {
      "_id": "ObjectId",
      "workspaceId": "string",
      "endpointId": "string",
      "endpointName": "string",
      "incidentNumber": "string",
      "status": "string",
      "severity": "string",
      "cause": "string",
      "currentHealth": "string",
      "startedAt": "date",
      "resolvedAt": "date|null",
      "durationMs": "number|null",
      "lastCheckAt": "date",
      "failureCount": "number",
      "affectedRegions": ["string"],
      "firstFailure": {
        "region": "string",
        "latencyMs": "number",
        "httpStatus": "number",
        "error": "string"
      },
      "latestFailure": {
        "region": "string",
        "latencyMs": "number",
        "httpStatus": "number",
        "error": "string"
      },
      "notificationsSent": {
        "email": "boolean",
        "slack": "boolean"
      },
      "acknowledgement": {
        "acknowledged": "boolean",
        "acknowledgedBy": "string|null",
        "acknowledgedAt": "date|null"
      },
      "resolutionSummary": "string|null",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  },
  "message": "Incidents fetched successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/incidents?page=1&limit=10&status=ONGOING \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": [
    {
      "_id": "640012345678901234567890",
      "workspaceId": "640012345678901234567891",
      "endpointId": "640012345678901234567892",
      "endpointName": "API Endpoint 1",
      "incidentNumber": "INC-000001",
      "status": "ONGOING",
      "severity": "CRITICAL",
      "cause": "Service Unavailable",
      "currentHealth": "DOWN",
      "startedAt": "2023-01-01T00:00:00.000Z",
      "resolvedAt": null,
      "durationMs": null,
      "lastCheckAt": "2023-01-01T00:05:00.000Z",
      "failureCount": 5,
      "affectedRegions": ["us-east-1", "eu-west-1"],
      "firstFailure": {
        "region": "us-east-1",
        "latencyMs": 5000,
        "httpStatus": 503,
        "error": "Service Unavailable"
      },
      "latestFailure": {
        "region": "eu-west-1",
        "latencyMs": 4800,
        "httpStatus": 503,
        "error": "Service Unavailable"
      },
      "notificationsSent": {
        "email": true,
        "slack": false
      },
      "acknowledgement": {
        "acknowledged": false,
        "acknowledgedBy": null,
        "acknowledgedAt": null
      },
      "resolutionSummary": null,
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:05:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  },
  "message": "Incidents fetched successfully"
}
```

---

## 2. Get Incident Details
**Endpoint:** `GET /incidents/:id`

**Description:** Retrieves detailed information about a specific incident.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Request Parameters:**
```
:id: string (path parameter)
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "string",
    "endpointId": "string",
    "endpointName": "string",
    "incidentNumber": "string",
    "status": "string",
    "severity": "string",
    "cause": "string",
    "currentHealth": "string",
    "startedAt": "date",
    "resolvedAt": "date|null",
    "durationMs": "number|null",
    "lastCheckAt": "date",
    "failureCount": "number",
    "affectedRegions": ["string"],
    "firstFailure": {
      "region": "string",
      "latencyMs": "number",
      "httpStatus": "number",
      "error": "string"
    },
    "latestFailure": {
      "region": "string",
      "latencyMs": "number",
      "httpStatus": "number",
      "error": "string"
    },
    "notificationsSent": {
      "email": "boolean",
      "slack": "boolean"
    },
    "acknowledgement": {
      "acknowledged": "boolean",
      "acknowledgedBy": "string|null",
      "acknowledgedAt": "date|null"
    },
    "resolutionSummary": "string|null",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Incident details fetched successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/incidents/640012345678901234567890 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567890",
    "workspaceId": "640012345678901234567891",
    "endpointId": "640012345678901234567892",
    "endpointName": "API Endpoint 1",
    "incidentNumber": "INC-000001",
    "status": "ONGOING",
    "severity": "CRITICAL",
    "cause": "Service Unavailable",
    "currentHealth": "DOWN",
    "startedAt": "2023-01-01T00:00:00.000Z",
    "resolvedAt": null,
    "durationMs": null,
    "lastCheckAt": "2023-01-01T00:05:00.000Z",
    "failureCount": 5,
    "affectedRegions": ["us-east-1", "eu-west-1"],
    "firstFailure": {
      "region": "us-east-1",
      "latencyMs": 5000,
      "httpStatus": 503,
      "error": "Service Unavailable"
    },
    "latestFailure": {
      "region": "eu-west-1",
      "latencyMs": 4800,
      "httpStatus": 503,
      "error": "Service Unavailable"
    },
    "notificationsSent": {
      "email": true,
      "slack": false
    },
    "acknowledgement": {
      "acknowledged": false,
      "acknowledgedBy": null,
      "acknowledgedAt": null
    },
    "resolutionSummary": null,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:05:00.000Z"
  },
  "message": "Incident details fetched successfully"
}
```

---

## 3. Get Incident Timeline
**Endpoint:** `GET /incidents/:id/timeline`

**Description:** Retrieves the timeline events for a specific incident.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Request Parameters:**
```
:id: string (path parameter)
```

**Response:**
```json
{
  "data": [
    {
      "_id": "ObjectId",
      "incidentId": "string",
      "workspaceId": "string",
      "eventType": "string",
      "message": "string",
      "metadata": "any",
      "createdAt": "date"
    }
  ],
  "message": "Incident timeline fetched successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/incidents/640012345678901234567890/timeline \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": [
    {
      "_id": "640012345678901234567893",
      "incidentId": "640012345678901234567890",
      "workspaceId": "640012345678901234567891",
      "eventType": "CREATED",
      "message": "Incident INC-000001 created",
      "metadata": {
        "endpointId": "640012345678901234567892",
        "endpointName": "API Endpoint 1",
        "cause": "Service Unavailable",
        "affectedRegions": ["us-east-1", "eu-west-1"]
      },
      "createdAt": "2023-01-01T00:00:00.000Z"
    },
    {
      "_id": "640012345678901234567894",
      "incidentId": "640012345678901234567890",
      "workspaceId": "640012345678901234567891",
      "eventType": "CHECK_FAILED",
      "message": "Health check failed",
      "metadata": {
        "region": "eu-west-1",
        "latencyMs": 4800,
        "httpStatus": 503,
        "error": "Service Unavailable"
      },
      "createdAt": "2023-01-01T00:05:00.000Z"
    }
  ],
  "message": "Incident timeline fetched successfully"
}
```

---

## 4. Acknowledge Incident
**Endpoint:** `PATCH /incidents/:id/acknowledge`

**Description:** Acknowledges an incident, marking it as acknowledged by a user.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Parameters:**
```
:id: string (path parameter)
```

**Request Body:**
```json
{
  "acknowledged": true
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "string",
    "endpointId": "string",
    "endpointName": "string",
    "incidentNumber": "string",
    "status": "string",
    "severity": "string",
    "cause": "string",
    "currentHealth": "string",
    "startedAt": "date",
    "resolvedAt": "date|null",
    "durationMs": "number|null",
    "lastCheckAt": "date",
    "failureCount": "number",
    "affectedRegions": ["string"],
    "firstFailure": {
      "region": "string",
      "latencyMs": "number",
      "httpStatus": "number",
      "error": "string"
    },
    "latestFailure": {
      "region": "string",
      "latencyMs": "number",
      "httpStatus": "number",
      "error": "string"
    },
    "notificationsSent": {
      "email": "boolean",
      "slack": "boolean"
    },
    "acknowledgement": {
      "acknowledged": "boolean",
      "acknowledgedBy": "string|null",
      "acknowledgedAt": "date|null"
    },
    "resolutionSummary": "string|null",
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Incident acknowledged successfully"
}
```

**Example Request:**
```bash
curl -X PATCH http://localhost:3000/incidents/640012345678901234567890/acknowledge \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"acknowledged": true}'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567890",
    "workspaceId": "640012345678901234567891",
    "endpointId": "640012345678901234567892",
    "endpointName": "API Endpoint 1",
    "incidentNumber": "INC-000001",
    "status": "ONGOING",
    "severity": "CRITICAL",
    "cause": "Service Unavailable",
    "currentHealth": "DOWN",
    "startedAt": "2023-01-01T00:00:00.000Z",
    "resolvedAt": null,
    "durationMs": null,
    "lastCheckAt": "2023-01-01T00:05:00.000Z",
    "failureCount": 5,
    "affectedRegions": ["us-east-1", "eu-west-1"],
    "firstFailure": {
      "region": "us-east-1",
      "latencyMs": 5000,
      "httpStatus": 503,
      "error": "Service Unavailable"
    },
    "latestFailure": {
      "region": "eu-west-1",
      "latencyMs": 4800,
      "httpStatus": 503,
      "error": "Service Unavailable"
    },
    "notificationsSent": {
      "email": true,
      "slack": false
    },
    "acknowledgement": {
      "acknowledged": true,
      "acknowledgedBy": "640012345678901234567895",
      "acknowledgedAt": "2023-01-01T00:10:00.000Z"
    },
    "resolutionSummary": null,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:10:00.000Z"
  },
  "message": "Incident acknowledged successfully"
}
```

---

## 5. Get Incident Statistics
**Endpoint:** `GET /incidents/stats`

**Description:** Retrieves statistics about incidents.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Response:**
```json
{
  "data": {
    "ongoing": "number",
    "resolvedToday": "number",
    "critical": "number",
    "averageResolutionTime": "number",
    "averageIncidentsPerDay": "number"
  },
  "message": "Incident statistics fetched successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/incidents/stats \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": {
    "ongoing": 5,
    "resolvedToday": 3,
    "critical": 2,
    "averageResolutionTime": 450000,
    "averageIncidentsPerDay": 1.5
  },
  "message": "Incident statistics fetched successfully"
}