
# Key-Vista

**Key-Vista** is a learning project built with [Nest.js](https://nestjs.com/), a progressive Node.js framework. This project serves as a playground to explore Nest.js features, integrating MongoDB for data persistence, Cloudinary for media storage, and Swagger UI for API documentation. It includes modules for authentication, properties, reviews, chats, and more, designed to mimic a real-world application.

## Table of Contents
- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure).

## Live Demo
Check out the live demo of the project [Key-Vista](https://keyvista-be-production.up.railway.app/api).

## Features
1. **User Authentication**
    - Login
    - Register
    - OTP (One-Time Password)
    - Password reset
2. **Property Management**
    - Create properties
    - Update properties
    - Filter properties
3. **Reviews System**
    - Create reviews
4. **Favorites System**
    - Add to favorites
5. **Chat Functionality**
    - Create and manage chats
6. **File Uploads**
    - Integration with Cloudinary for media storage
7. **Notifications**
    - Manage notifications
8. **API Documentation**
    - Interactive API documentation via Swagger UI

## Technologies
- **Nest.js**: A TypeScript-based Node.js framework
- **MongoDB**: NoSQL database for storing data
- **Cloudinary**: Cloud-based media storage for images and files
- **Swagger UI**: Interactive API documentation
- **TypeScript**: For type safety and a better developer experience

## API Endpoints

Below is a list of key endpoints available in the Key-Vista API, along with short summaries:
```
| Method | Endpoint                                     | Summary                                      |
|--------|----------------------------------------------|----------------------------------------------|
| POST   | `/auth/register`                             | Registers a new user with email and password |
| POST   | `/auth/login`                                | Authenticates a user and returns a JWT token |
| POST   | `/auth/verify-otp`                           | Verifies user with an OTP                    |
| POST   | `/auth/resend-otp`                           | Resends an OTP to the user                   |
| POST   | `/auth/forgot-password`                      | Initiates password reset process             |
| POST   | `/auth/reset-password`                       | Resets user password with a valid token      |
| GET    | `/chats/chat-heads`                          | Retrieves all chat heads                     |
| POST   | `/chats`                                     | Creates a new chat or chat head              |
| GET    | `/favorite/`                                 | Retrieves all user’s favorite properties     |
| PATCH  | `/favorite/`                                 | Adds or removes a property from favorites    |
| GET    | `/notification/`                             | Retrieves all user notifications             |
| GET    | `/notification/read`                         | Marks all notifications as read              |
| GET    | `/notification/notify`                       | Notifies user about unread notifications     |
| POST   | `/upload`                                    | Uploads an image to Cloudinary               |
| GET    | `/reviews/ratings/:id`                       | Retrieves ratings for a property by ID       |
| GET    | `/reviews/:id`                               | Retrieves reviews for a property by ID       |
| POST   | `/reviews`                                   | Creates a rating and review for a property   |
| POST   | `/properties`                                | Creates a new property listing               |
| GET    | `/properties`                                | Retrieves all properties                     |
| GET    | `/properties/my-properties`                  | Retrieves properties owned by the user       |
| GET    | `/properties/map-points-with-properties/get` | Retrieves all map points with properties     |
| GET    | `/properties/:id`                            | Retrieves a property by ID                   |
| PATCH  | `/properties/:id`                            | Updates a property by ID                     |
| DELETE | `/properties/:id`                            | Deletes a property by ID                     |
| GET    | `/user/me`                                   | Retrieves the current user’s profile         |
| PATCH  | `/user/update`                               | Updates the current user’s profile           |
| GET    | `/user/change-password`                      | Changes the current user’s password          |
```

**Note**: Endpoints requiring authentication use a JWT token in the `Authorization` header (Bearer token). Visit `/api` in Swagger UI for detailed request/response schemas.

## Project Structure
Here’s the structure of the Key-Vista project:
```
.env
.gitignore
.prettierrc
eslint.config.mjs
nest-cli.json
package.json
README.md
tsconfig.build.json
tsconfig.json
src/
├── app.module.ts
├── main.ts
├── config/
│   ├── cloudinary.config.ts
│   └── swagger.config.ts
├── decorators/
│   └── loggedInuser.decorator.ts
├── guards/
│   └── jwt-authentication.guard.ts
├── module/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dto/
│   │   │   ├── email.dto.ts
│   │   │   ├── login.dto.ts
│   │   │   ├── otp.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── reset-password.dto.ts
│   │   └── services/
│   │       └── email.service.ts
│   ├── chats/
│   │   ├── chats.controller.ts
│   │   ├── chats.module.ts
│   │   ├── chats.service.ts
│   │   └── dto/
│   │       └── create.dto.ts
│   ├── favorite/
│   │   ├── favorite.controller.ts
│   │   ├── favorite.module.ts
│   │   ├── favorite.service.ts
│   ├── notification/
│   │   ├── notification.controller.ts
│   │   ├── notification.module.ts
│   │   ├── notification.service.ts
│   ├── properties/
│   │   ├── properties.controller.ts
│   │   ├── properties.module.ts
│   │   ├── properties.service.ts
│   │   ├── dto/
│   │   │   ├── create-property.dto.ts
│   │   │   ├── filter.dto.ts
│   │   │   └── update-property.dto.ts
│   ├── reviews/
│   │   ├── reviews.controller.ts
│   │   ├── reviews.module.ts
│   │   ├── reviews.service.ts
│   │   └── dto/
│   │       └── create-reviews.dto.ts
│   ├── upload/
│   │   ├── upload.controller.ts
│   │   ├── upload.module.ts
│   │   └── upload.service.ts
│   └── user/
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.ts
│       └── dto/
│           ├── change-password.dto.ts
│           └── update-user.dto.ts
├── schemas/
│   ├── base.schema.ts
│   ├── chats.schema.ts
│   ├── favorite.schema.ts
│   ├── notification.schema.ts
│   ├── property.schema.ts
│   ├── register.schema.ts
│   └── reviews.schema.ts
├── strategies/
│   └── jwt-strategy.ts
├── types/
│    ├── filter-query.ts
│    ├── jwt.type.ts
│    ├── location.ts
│    └── user-response.ts
├── enum/
│    ├── authorization.enum.ts
│    ├── property-condition.ts
│    ├── property-kind.ts
│    └── property-purpose.ts
└── utils/
    ├── otp-generator.ts
    └── update-response.ts
```

