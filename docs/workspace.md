# Workspace API Documentation

This document provides comprehensive documentation for all Workspace-related APIs in the system.

## 1. Create Workspace
**Endpoint:** `POST /workspaces`

**Description:** Creates a new workspace with the specified name and assigns the current user as the owner.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Workspace Name"
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "name": "Workspace Name",
    "slug": "workspace-name",
    "ownerUserId": "ObjectId",
    "plan": "FREE",
    "subscriptionStatus": "FREE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace created successfully"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/workspaces \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"name": "My New Workspace"}'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567890",
    "name": "My New Workspace",
    "slug": "my-new-workspace",
    "ownerUserId": "640012345678901234567891",
    "plan": "FREE",
    "subscriptionStatus": "FREE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace created successfully"
}
```

---

## 2. Get Workspaces
**Endpoint:** `GET /workspaces`

**Description:** Retrieves all workspaces that the current user belongs to.

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
      "name": "Workspace Name",
      "slug": "workspace-name",
      "ownerUserId": "ObjectId",
      "plan": "FREE",
      "subscriptionStatus": "FREE",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Workspaces retrieved successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/workspaces \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": [
    {
      "_id": "640012345678901234567890",
      "name": "My New Workspace",
      "slug": "my-new-workspace",
      "ownerUserId": "640012345678901234567891",
      "plan": "FREE",
      "subscriptionStatus": "FREE",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Workspaces retrieved successfully"
}
```

---

## 3. Get Current Workspace
**Endpoint:** `GET /workspaces/current`

**Description:** Retrieves the current workspace that the user belongs to.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "name": "Workspace Name",
    "slug": "workspace-name",
    "ownerUserId": "ObjectId",
    "plan": "FREE",
    "subscriptionStatus": "FREE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Current workspace retrieved successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/workspaces/current \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567890",
    "name": "My New Workspace",
    "slug": "my-new-workspace",
    "ownerUserId": "640012345678901234567891",
    "plan": "FREE",
    "subscriptionStatus": "FREE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Current workspace retrieved successfully"
}
```

---

## 4. Update Workspace
**Endpoint:** `PATCH /workspaces`

**Description:** Updates the specified workspace with the provided fields.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Body:**
```json
{
  "workspaceId": "ObjectId",
  "name": "Updated Workspace Name",
  "plan": "BASIC"
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "name": "Updated Workspace Name",
    "slug": "updated-workspace-name",
    "ownerUserId": "ObjectId",
    "plan": "BASIC",
    "subscriptionStatus": "FREE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace updated successfully"
}
```

**Example Request:**
```bash
curl -X PATCH http://localhost:3000/workspaces \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "640012345678901234567890",
    "name": "Updated Workspace Name"
  }'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567890",
    "name": "Updated Workspace Name",
    "slug": "updated-workspace-name",
    "ownerUserId": "640012345678901234567891",
    "plan": "BASIC",
    "subscriptionStatus": "FREE",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace updated successfully"
}
```

---

## 5. Get Workspace Members
**Endpoint:** `GET /workspaces/members`

**Description:** Retrieves all members of a specific workspace.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Request Parameters:**
```
workspaceId: ObjectId (query parameter)
```

**Response:**
```json
{
  "data": [
    {
      "_id": "ObjectId",
      "workspaceId": "ObjectId",
      "userId": "ObjectId",
      "role": "OWNER",
      "invitedBy": "ObjectId",
      "joinedAt": "2023-01-01T00:00:00.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Workspace members retrieved successfully"
}
```

**Example Request:**
```bash
curl -X GET http://localhost:3000/workspaces/members?workspaceId=640012345678901234567890 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "data": [
    {
      "_id": "640012345678901234567892",
      "workspaceId": "640012345678901234567890",
      "userId": "640012345678901234567891",
      "role": "OWNER",
      "invitedBy": null,
      "joinedAt": "2023-01-01T00:00:00.000Z",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "message": "Workspace members retrieved successfully"
}
```

---

## 6. Add Workspace Member
**Endpoint:** `POST /workspaces/members`

**Description:** Adds a new member to the workspace.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Body:**
```json
{
  "workspaceId": "ObjectId",
  "userId": "ObjectId",
  "role": "ADMIN",
  "invitedBy": "ObjectId"
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "ObjectId",
    "userId": "ObjectId",
    "role": "ADMIN",
    "invitedBy": "ObjectId",
    "joinedAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace member added successfully"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/workspaces/members \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "640012345678901234567890",
    "userId": "640012345678901234567893",
    "role": "ADMIN"
  }'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567894",
    "workspaceId": "640012345678901234567890",
    "userId": "640012345678901234567893",
    "role": "ADMIN",
    "invitedBy": null,
    "joinedAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace member added successfully"
}
```

---

## 7. Update Workspace Member
**Endpoint:** `PATCH /workspaces/members/:id`

**Description:** Updates the role or other details of a workspace member.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Parameters:**
```
:id: ObjectId (path parameter)
```

**Request Body:**
```json
{
  "role": "EDITOR"
}
```

**Response:**
```json
{
  "data": {
    "_id": "ObjectId",
    "workspaceId": "ObjectId",
    "userId": "ObjectId",
    "role": "EDITOR",
    "invitedBy": "ObjectId",
    "joinedAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace member updated successfully"
}
```

**Example Request:**
```bash
curl -X PATCH http://localhost:3000/workspaces/members/640012345678901234567894 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"role": "EDITOR"}'
```

**Example Response:**
```json
{
  "data": {
    "_id": "640012345678901234567894",
    "workspaceId": "640012345678901234567890",
    "userId": "640012345678901234567893",
    "role": "EDITOR",
    "invitedBy": null,
    "joinedAt": "2023-01-01T00:00:00.000Z",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  "message": "Workspace member updated successfully"
}
```

---

## 8. Remove Workspace Member
**Endpoint:** `DELETE /workspaces/members/:id`

**Description:** Removes a member from the workspace.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
```

**Request Parameters:**
```
:id: ObjectId (path parameter)
```

**Response:**
```json
{
  "message": "Workspace member removed successfully"
}
```

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/workspaces/members/640012345678901234567894 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Example Response:**
```json
{
  "message": "Workspace member removed successfully"
}
```

---

## 9. Transfer Ownership
**Endpoint:** `POST /workspaces/transfer-ownership`

**Description:** Transfers ownership of a workspace to another user.

**Request Headers:**
```
Authorization: Bearer jwt-token-string
Content-Type: application/json
```

**Request Body:**
```json
{
  "workspaceId": "ObjectId",
  "currentOwnerId": "ObjectId",
  "newOwnerId": "ObjectId"
}
```

**Response:**
```json
{
  "message": "Workspace ownership transferred successfully"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:3000/workspaces/transfer-ownership \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{
    "workspaceId": "640012345678901234567890",
    "currentOwnerId": "640012345678901234567891",
    "newOwnerId": "640012345678901234567893"
  }'
```

**Example Response:**
```json
{
  "message": "Workspace ownership transferred successfully"
}