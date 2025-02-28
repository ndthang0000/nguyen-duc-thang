# Scoreboard API Module
This module provides a backend API service for managing and updating a live scoreboard displayed on a website. It handles score updates triggered by user actions, ensures security against unauthorized modifications, and supports real-time updates for the top 10 users.

High Traffic Handling: The system is designed to handle high traffic efficiently. Ensure over about many thoudsand request per seconds
## Technology Stack
- Programming Language: Node.js & Typescript
- Web Framework: Nestjs
- Database: MongoDB for store info such as user, history, score...
- Real-Time Communication: Socket.io (for live scoreboard updates)
- Authentication: JWT (JSON Web Tokens) for secure API access
- Message Queue: Rabbit MQ (communicate in microservice)
- Caching: Redis (for caching scoreboard data). Special attention to the type data ```sorted sets``` of Redis. Furthermore, Redis is also used to Adapter for multiple Socket instances to ensure exact connection between client and server because it can be scalable when have high traffic
- Logging: Winston
## Architecture
We create a microservice system includes Score Service and Socket Service, Redis, RabbitMQ, MongoDB
  - Score Service: handle action change score from directly user and perform action relevant data in Redis and Mongo
  - Socket Service: create connect with end user by socket.io library. Take responsibility live update leader board real time when occur changes top 10
  - Redis: Store leader board with ```sorted sets```. Store distributed connection of socket info for multiple instances of Socket Service
  - RabbitMQ: transfer message update leader board from Score Service to Socket Service when occur changes
  - MongoDB: Store User, Action, History...

*Detail: view image live-board.drawio.png in the same folder* 

## Key Design Decisions
- In-Memory Storage: ```sorted set``` of Redis was chosen for its speed in handling frequent read/write operations, critical for real-time score updates and leaderboard queries.
- WebSocket for Real-Time Updates: Selected over polling to reduce server load and provide instant updates to the frontend.
- JWT Authentication: Ensures secure, token-based access control for API requests, preventing unauthorized score changes.
- Rate Limiting: Implemented to prevent abuse and ensure fair resource usage.
- Caching: Top 10 scoreboard entries are briefly cached to reduce database strain during peak traffic.
## Integration Points
- Authentication Service: Relies on an external service to generate and verify JWT tokens.
- Frontend Application: Connects via REST API for score submissions and WebSocket for real-time leaderboard updates.
- Persistent Storage: Optionally syncs Redis data with a durable database (e.g., PostgreSQL) for backup and recovery.
## Overview
The Scoreboard API is a RESTful service integrated into the backend application server. It manages user scores, validates requests, and broadcasts updates to the frontend for real-time display. The service emphasizes security to prevent malicious score manipulation and scalability to handle frequent updates.

## Endpoints
PATCH `/api/scoreboard/update`

- **Description**: Updates a user's score after completing an authorized action.
- **Method**: PATCH
- **Request** Body:
```json
{
  "action": "type",
  "scoreIncrement": "number" // Amount to increase the score by (positive integer)
}
```
- **Headers:**
Authorization: Bearer token (JWT) to validate the request.
- **Responses**:
200 OK: Score updated successfully.
```json
{
  "userId": "string",
  "newScore": "number",
  "timestamp": "ISO 8601 string"
} 
```
- 400 Bad Request: Invalid input (e.g., negative increment, missing fields).
- 401 Unauthorized: Invalid or missing token.
- 403 Forbidden: User lacks permission to update score.
Notes:
The scoreIncrement must be validated server-side to match the expected value for the action (e.g., 10 points per action).
GET `/api/scoreboard/top`
Description: Retrieves the current top 10 users and their scores.
Method: GET
Query Parameters: None
Responses:
200 OK: Returns the top 10 users.
```json
[
  { "userId": "string", "score": "number", "rank": "number" },
  ...
]
```
500 Internal Server Error: Failed to retrieve scoreboard data.
Notes:
Scores are sorted in descending order.
Response is cached briefly (e.g., 5 seconds) to reduce database load.
Real-Time Updates
Mechanism: WebSocket connection at /ws/scoreboard.
Description: Clients connect to this endpoint to receive live updates of the top 10 scoreboard.
Message Format:
```json
{
  "event": "scoreboardUpdate",
  "data": [
    { "userId": "string", "score": "number", "rank": "number" },
    ...
  ]
}
```
