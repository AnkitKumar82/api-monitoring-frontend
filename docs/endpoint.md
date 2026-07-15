# Endpoint API Documentation

This document provides comprehensive documentation for all Endpoint-related APIs in the system.

## 1. Create Endpoint
**Endpoint:** `POST /endpoints`

**Description:** Creates a new endpoint with the specified configuration.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Body:**
```json
{
  "workspaceId": "ObjectId",
  "createdBy": "ObjectId",
  "name": "Endpoint Name",
  "description": "Endpoint description",
  "url": "https://api.example.com/endpoint",
  "method": "GET",
  "intervalSeconds": 60,
  "timeoutMs": 10000,
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer token"
    }
  ],
  "body": "{\"key\": \"value\"}",
  "expectedStatusCodes": [200, 201],
  "expectedResponseContains": "success",
  "followRedirects": true,
  "enabled": true,
  "tags": ["tag1", "tag2"],
  "regions": ["us-east-1", "eu-west-1"],
  "notificationGroupIds": ["ObjectId"],
  "status": "ACTIVE",
  "nextExecutionAt": "2023-01-01T00:00:00.000Z"
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "ObjectId",
    "createdBy": "ObjectId",
    "name": "Endpoint Name",
    "description": "Endpoint description",
    "url": "https://api.example.com/endpoint",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 10000,
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer token"
      }
    ],
    "body": "{\"key\": \"value\"}",
    "expectedStatusCodes": [200, 201],
    "expectedResponseContains": "success",
    "followRedirects": true,
    "enabled": true,
    "tags": ["tag1", "tag2"],
    "regions": ["us-east-1", "eu-west-1"],
    "notificationGroupIds": ["ObjectId"],
    "status": "ACTIVE",
    "nextExecutionAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Endpoint created successfully"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/endpoints \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "640012345678901234567890",
    "createdBy": "640012345678901234567891",
    "name": "Test Endpoint",
    "url": "https://api.example.com/test"
  }'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567892",
    "workspaceId": "640012345678901234567890",
    "createdBy": "640012345678901234567891",
    "name": "Test Endpoint",
    "description": "",
    "url": "https://api.example.com/test",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 10000,
    "headers": [],
    "body": "",
    "expectedStatusCodes": [200],
    "expectedResponseContains": "",
    "followRedirects": true,
    "enabled": true,
    "tags": [],
    "regions": [],
    "notificationGroupIds": [],
    "status": "ACTIVE",
    "nextExecutionAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Endpoint created successfully"
}
```

---

## 2. Get Endpoint
**Endpoint:** `GET /endpoints/:id`

**Description:** Retrieves a specific endpoint by its ID.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "ObjectId",
    "createdBy": "ObjectId",
    "name": "Endpoint Name",
    "description": "Endpoint description",
    "url": "https://api.example.com/endpoint",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 10000,
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer token"
      }
    ],
    "body": "{\"key\": \"value\"}",
    "expectedStatusCodes": [200, 201],
    "expectedResponseContains": "success",
    "followRedirects": true,
    "enabled": true,
    "tags": ["tag1", "tag2"],
    "regions": ["us-east-1", "eu-west-1"],
    "notificationGroupIds": ["ObjectId"],
    "status": "ACTIVE",
    "nextExecutionAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Endpoint retrieved successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/endpoints/640012345678901234567892 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567892",
    "workspaceId": "640012345678901234567890",
    "createdBy": "640012345678901234567891",
    "name": "Test Endpoint",
    "description": "",
    "url": "https://api.example.com/test",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 10000,
    "headers": [],
    "body": "",
    "expectedStatusCodes": [200],
    "expectedResponseContains": "",
    "followRedirects": true,
    "enabled": true,
    "tags": [],
    "regions": [],
    "notificationGroupIds": [],
    "status": "ACTIVE",
    "nextExecutionAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Endpoint retrieved successfully"
}
```

---

## 3. Update Endpoint
**Endpoint:** `PUT /endpoints/:id`

**Description:** Updates an existing endpoint with the provided fields.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Updated Endpoint Name",
  "description": "Updated description",
  "url": "https://api.example.com/updated-endpoint",
  "method": "POST",
  "intervalSeconds": 30,
  "timeoutMs": 15000,
  "headers": [
    {
      "key": "Authorization",
      "value": "Bearer updated-token"
    }
  ],
  "body": "{\"updated\": \"data\"}",
  "expectedStatusCodes": [200],
  "expectedResponseContains": "updated",
  "followRedirects": false,
  "enabled": false,
  "tags": ["updated-tag1", "updated-tag2"],
  "regions": ["us-west-1"]
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "ObjectId",
    "createdBy": "ObjectId",
    "name": "Updated Endpoint Name",
    "description": "Updated description",
    "url": "https://api.example.com/updated-endpoint",
    "method": "POST",
    "intervalSeconds": 30,
    "timeoutMs": 15000,
    "headers": [
      {
        "key": "Authorization",
        "value": "Bearer updated-token"
      }
    ],
    "body": "{\"updated\": \"data\"}",
    "expectedStatusCodes": [200],
    "expectedResponseContains": "updated",
    "followRedirects": false,
    "enabled": false,
    "tags": ["updated-tag1", "updated-tag2"],
    "regions": ["us-west-1"],
    "notificationGroupIds": ["ObjectId"],
    "status": "ACTIVE",
    "nextExecutionAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Endpoint updated successfully"
}
```

**Example Request:**
```bash
curl -X PUT http://localhost:3000/endpoints/640012345678901234567892 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Test Endpoint",
    "url": "https://api.example.com/updated-test"
  }'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567892",
    "workspaceId": "640012345678901234567890",
    "createdBy": "640012345678901234567891",
    "name": "Updated Test Endpoint",
    "description": "",
    "url": "https://api.example.com/updated-test",
    "method": "GET",
    "intervalSeconds": 60,
    "timeoutMs": 10000,
    "headers": [],
    "body": "",
    "expectedStatusCodes": [200],
    "expectedResponseContains": "",
    "followRedirects": true,
    "enabled": true,
    "tags": [],
    "regions": [],
    "notificationGroupIds": [],
    "status": "ACTIVE",
    "nextExecutionAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Endpoint updated successfully"
}
```

---

## 4. Delete Endpoint
**Endpoint:** `DELETE /endpoints/:id`

**Description:** Deletes a specific endpoint by its ID.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Response:**
```json
{
  "message": "Endpoint deleted successfully"
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/endpoints/640012345678901234567892 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "message": "Endpoint deleted successfully"
}
```

---

## 5. Get All Endpoints
**Endpoint:** `GET /endpoints`

**Description:** Retrieves all endpoints available in the system.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Response:**
```json
{
  "data": [
    {
      "_id": "ObjectId",
      "workspaceId": "ObjectId",
      "createdBy": "ObjectId",
      "name": "Endpoint Name",
      "description": "Endpoint description",
      "url": "https://api.example.com/endpoint",
      "method": "GET",
      "intervalSeconds": 60,
      "timeoutMs": 10000,
      "headers": [
        {
          "key": "Authorization",
          "value": "Bearer token"
        }
      ],
      "body": "{\"key\": \"value\"}",
      "expectedStatusCodes": [200, 201],
      "expectedResponseContains": "success",
      "followRedirects": true,
      "enabled": true,
      "tags": ["tag1", "tag2"],
      "regions": ["us-east-1", "eu-west-1"],
      "notificationGroupIds": ["ObjectId"],
      "status": "ACTIVE",
      "nextExecutionAt": "2023-01-01T00:00:00.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Endpoints retrieved successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/endpoints \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": [
    {
      "_id": "640012345678901234567892",
      "workspaceId": "640012345678901234567890",
      "createdBy": "640012345678901234567891",
      "name": "Updated Test Endpoint",
      "description": "",
      "url": "https://api.example.com/updated-test",
      "method": "GET",
      "intervalSeconds": 60,
      "timeoutMs": 10000,
      "headers": [],
      "body": "",
      "expectedStatusCodes": [200],
      "expectedResponseContains": "",
      "followRedirects": true,
      "enabled": true,
      "tags": [],
      "regions": [],
      "notificationGroupIds": [],
      "status": "ACTIVE",
      "nextExecutionAt": "2023-01-01T00:00:00.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Endpoints retrieved successfully"
}