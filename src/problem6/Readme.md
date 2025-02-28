# Scoreboard API Module
This module provides a backend API service for managing and updating a live scoreboard displayed on a website. It handles score updates triggered by user actions, ensures security against unauthorized modifications, and supports real-time updates for the top 10 users.

The system is designed to handle high traffic efficiently, ensuring it can process thousands of requests per second.

## Technology Stack
- **Programming Language**: Node.js & TypeScript
- **Web Framework**: NestJS
- **Database**: MongoDB (for storing user info, history, scores, etc.)
- **Real-Time Communication**: Socket.io (for live scoreboard updates)
- **Authentication**: JWT (JSON Web Tokens) for secure API access
- **Message Queue**: RabbitMQ (for communication in microservices)
- **Caching**: Redis (for caching scoreboard data, using sorted sets). Redis is also used as an adapter for multiple Socket instances to ensure accurate connections between clients and servers, providing scalability for high traffic.
- **Logging**: Winston

## Architecture
The system is a microservice architecture including Score Service, Socket Service, Redis, RabbitMQ, and MongoDB:
- **Score Service**: Handles score changes from users and updates data in Redis and MongoDB.
- **Socket Service**: Manages connections with end-users via Socket.io, providing real-time leaderboard updates when the top 10 changes.
- **Redis**: Stores the leaderboard using sorted sets and manages distributed socket connections across multiple instances.
- **RabbitMQ**: Transfers leaderboard update messages from the Score Service to the Socket Service.
- **MongoDB**: Stores user data, actions, and history.

*Detail: view image `live-board.drawio.png` in the same folder.*

## Flow Execution

1. Users access the website, establishing a socket connection with the server to receive top 10 user scores.
2. When users perform actions that change scores, the requests go through the API Gateway.
3. The API Gateway routes the request to the Score Service, where it is authorized. If successful, the user's score is updated in Redis and MongoDB. The new top 10 is calculated, and if it changes, a message is dispatched to RabbitMQ.
4. The Socket Service receives the message and broadcasts the new top 10 to all connected clients.
5. Clients receive the updated data and refresh the UI accordingly.

*Detail: view image `live-board.flowchart.drawio.png` in the same folder.*

## Key Design Decisions
- **Caching**: Use Redis sorted sets for leaderboard data.
- **Redis Adapter**: Ensures synchronous connections across multiple instances for scalability.
- **WebSocket for Real-Time Updates**: disable polling by setting ```transports: ['websocket']```  in your clients socket.io configuration or you have to enable cookie based routing in your load balancer
- **JWT Authentication**: Provides secure, token-based access control for API requests.
- **Rate Limiting**: Prevents abuse and ensures fair resource usage.

## Code Implementation

### 1. RESTful Endpoints

#### PATCH `/api/scoreboard/update`
- **Description**: Updates a user's score after an authorized action.
- **Method**: PATCH
- **Request Body**:
```json
{
  "action": "type",
  "scoreIncrement": "number"
}
```
- **Headers**: Authorization: Bearer token (JWT)
- **Responses**:
  - 200 OK: Score updated successfully.
  ```json
  {
    "userId": "string",
    "newScore": "number",
    "timestamp": "ISO 8601 string"
  }
  ```
  - 400 Bad Request: Invalid input.
  - 401 Unauthorized: Invalid or missing token.
  - 403 Forbidden: User lacks permission to update score.

#### GET `/api/scoreboard/top`
- **Description**: Retrieves the current top 10 users and their scores.
- **Method**: GET
- **Responses**:
  - 200 OK: Returns the top 10 users.
  ```json
  [
    { "userId": "string", "score": "number", "rank": 1 },
    { "userId": "string", "score": "number", "rank": 2 },
    ...
  ]
  ```

### 2. Socket Events

#### Event: `connect`
- **Description**: Triggered when a client successfully connects to the Socket Service.
- **Payload**: None

#### Event: `disconnect`
- **Description**: Triggered when a client disconnects from the Socket Service.
- **Payload**: None

#### Event: `updateTop10`
- **Description**: Broadcasts the updated top 10 users to all connected clients.
- **Payload**:
```json
[
  { "userId": "string", "score": "number", "rank": "number" },
  ...
]
```

#### Event: `myScoreUpdated`
- **Description**: Sent to a specific user when their score is updated.
- **Payload**:
```json
{
  "userId": "string",
  "newScore": "number",
  "timestamp": "ISO 8601 string"
}
```

## Note: Improving Software Quality
- Use Helmet to filter headers and sanitize inputs to prevent HTML/SQL injection.
- Should use cluster Redis to handle high CCU
- To avoiding receving many message from RabbitMQ in the short time, the Socket Service should implement ```Debounce or Throttle Mechanism```
- Divide authentication to separated service to optimize performance and scalability.
