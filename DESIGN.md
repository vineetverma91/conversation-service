# Conversation Session Service - Design Document

## Overview
This service manages conversation sessions and related events for a Voice AI platform.
Each session represents a call, and each event represents an interaction within that call.

The system is built using NestJS, TypeScript, and MongoDB.

---

## Architecture

The application follows a modular NestJS architecture:

- Sessions Module: Handles session lifecycle
- Events Module: Handles session events
- Controllers: Expose REST APIs
- Services: Contain business logic
- Schemas: Define MongoDB data models

This ensures separation of concerns and maintainability.

---

## Technology Stack

- Backend Framework: NestJS
- Language: TypeScript
- Database: MongoDB
- ODM: Mongoose
- Environment Config: dotenv

---

## Data Model

### ConversationSession
Fields:
- sessionId (unique, external identifier)
- status (initiated | active | completed | failed)
- language
- startedAt
- endedAt
- metadata

### ConversationEvent
Fields:
- eventId (unique per session)
- sessionId (reference)
- type (user_speech | bot_speech | system)
- payload
- timestamp

Two separate collections are used: sessions and events.

---

## Idempotency and Concurrency

### Session Creation
- Implemented using MongoDB atomic upsert (findOneAndUpdate with upsert).
- Ensures that repeated requests do not create duplicate sessions.
- Safe under concurrent requests.

### Event Creation
- Enforced using compound unique index on (sessionId, eventId).
- Duplicate events are prevented at database level.
- Duplicate requests return existing events.

### Session Completion
- Implemented using idempotent update.
- Multiple calls produce the same result.

---

## Database Indexing

Indexes are used to improve performance and ensure data integrity:

- Unique index on sessionId in sessions collection
- Compound unique index on (sessionId, eventId) in events collection
- Index on sessionId in events collection for faster queries

These indexes optimize read and write operations.

---

## Pagination Strategy

Events are paginated using limit and offset parameters.

Example:

This simple approach meets the assignment requirements without over-engineering.

---

## Error Handling

- 404 is returned when session does not exist.
- Duplicate key errors are handled gracefully.
- Invalid operations are prevented at service level.

NestJS exception handling is used for consistency.

---

## Testing Strategy

Manual API testing was performed using Postman/Thunder Client.

Test cases included:
- Duplicate session creation
- Duplicate event creation
- Pagination validation
- Session completion
- Invalid session handling

MongoDB shell was used to verify persisted data.

---

## Configuration Management

Environment variables are used for configuration:

- MONGO_URL
- PORT

Configuration is loaded from `.env` file.

Sensitive information is excluded from version control.

---

## Limitations and Future Improvements

If more time were available, the following improvements would be added:

- DTO validation using class-validator
- Unit and integration tests
- Authentication and authorization
- Redis caching for frequently accessed sessions
- Cursor-based pagination
- API documentation using Swagger
- Structured logging and monitoring

---

## Conclusion

This project focuses on correctness, clarity, and maintainability.
It demonstrates real-world backend design principles including modularity,
idempotency, concurrency safety, and data integrity.

The implementation satisfies all core assignment requirements.