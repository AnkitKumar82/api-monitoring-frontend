# Notification Channel API

## Overview

Notification channels allow you to configure how alerts are sent when monitoring endpoints. This API provides endpoints to manage different types of notification channels such as email, Slack, etc.

## Endpoints

### Create Notification Channel
```
POST /notification-channels
```

**Request Body:**
```json
{
  "name": "string",
  "type": "email | slack | webhook",
  "config": {
    "email": {
      "to": "string"
    },
    "slack": {
      "webhookUrl": "string",
      "channel": "string"
    },
    "webhook": {
      "url": "string",
      "method": "GET | POST | PUT | DELETE",
      "headers": {
        "key": "value"
      }
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "_id": "string",
    "name": "string",
    "type": "email | slack | webhook",
    "config": {
      "email": {
        "to": "string"
      },
      "slack": {
        "webhookUrl": "string",
        "channel": "string"
      },
      "webhook": {
        "url": "string",
        "method": "GET | POST | PUT | DELETE",
        "headers": {
          "key": "value"
        }
      }
    },
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Notification channel created successfully"
}
```

### Get All Notification Channels
```
GET /notification-channels
```

**Response:**
```json
{
  "data": [
    {
      "_id": "string",
      "name": "string",
      "type": "email | slack | webhook",
      "config": {
        "email": {
          "to": "string"
        },
        "slack": {
          "webhookUrl": "string",
          "channel": "string"
        },
        "webhook": {
          "url": "string",
          "method": "GET | POST | PUT | DELETE",
          "headers": {
            "key": "value"
          }
        }
      },
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "message": "Notification channels retrieved successfully"
}
```

### Get Notification Channel
```
GET /notification-channels/:id
```

**Response:**
```json
{
  "data": {
    "_id": "string",
    "name": "string",
    "type": "email | slack | webhook",
    "config": {
      "email": {
        "to": "string"
      },
      "slack": {
        "webhookUrl": "string",
        "channel": "string"
      },
      "webhook": {
        "url": "string",
        "method": "GET | POST | PUT | DELETE",
        "headers": {
          "key": "value"
        }
      }
    },
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Notification channel retrieved successfully"
}
```

### Update Notification Channel
```
PUT /notification-channels/:id
```

**Request Body:**
```json
{
  "name": "string",
  "type": "email | slack | webhook",
  "config": {
    "email": {
      "to": "string"
    },
    "slack": {
      "webhookUrl": "string",
      "channel": "string"
    },
    "webhook": {
      "url": "string",
      "method": "GET | POST | PUT | DELETE",
      "headers": {
        "key": "value"
      }
    }
  }
}
```

**Response:**
```json
{
  "data": {
    "_id": "string",
    "name": "string",
    "type": "email | slack | webhook",
    "config": {
      "email": {
        "to": "string"
      },
      "slack": {
        "webhookUrl": "string",
        "channel": "string"
      },
      "webhook": {
        "url": "string",
        "method": "GET | POST | PUT | DELETE",
        "headers": {
          "key": "value"
        }
      }
    },
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Notification channel updated successfully"
}
```

### Delete Notification Channel
```
DELETE /notification-channels/:id
```

**Response:**
```json
{
  "data": {
    "_id": "string",
    "name": "string",
    "type": "email | slack | webhook",
    "config": {
      "email": {
        "to": "string"
      },
      "slack": {
        "webhookUrl": "string",
        "channel": "string"
      },
      "webhook": {
        "url": "string",
        "method": "GET | POST | PUT | DELETE",
        "headers": {
          "key": "value"
        }
      }
    },
    "createdAt": "date",
    "updatedAt": "date"
  },
  "message": "Notification channel deleted successfully"
}
```

## Types

### NotificationChannel
```typescript
interface NotificationChannel {
  _id: string;
  name: string;
  type: 'email' | 'slack' | 'webhook';
  config: {
    email?: {
      to: string;
    };
    slack?: {
      webhookUrl: string;
      channel?: string;
    };
    webhook?: {
      url: string;
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      headers?: Record<string, string>;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}
```

### NotificationChannelCreateRequest
```typescript
interface NotificationChannelCreateRequest {
  name: string;
  type: 'email' | 'slack' | 'webhook';
  config: {
    email?: {
      to: string;
    };
    slack?: {
      webhookUrl: string;
      channel?: string;
    };
    webhook?: {
      url: string;
      method: 'GET' | 'POST' | 'PUT' | 'DELETE';
      headers?: Record<string, string>;
    };
  };
}
```

### NotificationChannelUpdateRequest
```typescript
interface NotificationChannelUpdateRequest {
  name?: string;
  type?: 'email' | 'slack' | 'webhook';
  config?: {
    email?: {
      to?: string;
    };
    slack?: {
      webhookUrl?: string;
      channel?: string;
    };
    webhook?: {
      url?: string;
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      headers?: Record<string, string>;
    };
  };
}