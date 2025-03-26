# Key-Vista

**Key-Vista** is a learning project built with [Nest.js](https://nestjs.com/), a progressive Node.js framework. This project serves as a playground to explore Nest.js features, integrating MongoDB for data persistence, Cloudinary for media storage, and Swagger UI for API documentation. It includes modules for authentication, properties, reviews, chats, and more, designed to mimic a real-world application.

## Live Demo
Check out the live demo of the project [Key-Vista](https://keyvista-be-production.up.railway.app/api).

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [License](#license)

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
- **TypeScript**: For type safety and better developer experience

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
| GET    | `/user/hange-password`                       | Changes the current user’s password          |
```

**Note**: Endpoints requiring authentication use a JWT token in the `Authorization` header (Bearer token). Visit `/api` in Swagger UI for detailed request/response schemas. The `/user/hange-password` endpoint might be a typo; it’s likely intended as `/user/change-password`.

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
vercel.json
src/
├── app.controller.ts     # Root controller
├── app.module.ts         # Root module
├── main.ts               # Local development entry point
├── api/                  # Feature modules
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── dtos/
│   │   │   ├── login.dto.ts
│   │   │   ├── otp.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   ├── resend-otp.dto.ts
│   │   │   └── reset-password.dto.ts
│   │   ├── entities/
│   │   │   └── register.entity.ts
│   │   └── services/
│   │       └── email.service.ts
│   ├── chats/
│   │   ├── chats.controller.ts
│   │   ├── chats.module.ts
│   │   ├── chats.service.ts
│   │   ├── dtos/
│   │   │   └── create.dto.ts
│   │   └── entities/
│   │       └── chats.entities.ts
│   ├── favorite/
│   │   ├── favorite.controller.ts
│   │   ├── favorite.module.ts
│   │   ├── favorite.service.ts
│   │   └── entities/
│   │       └── favorite.entities.ts
│   ├── notification/
│   │   ├── notification.controller.ts
│   │   ├── notification.module.ts
│   │   ├── notification.service.ts
│   │   └── entities/
│   │       └── notification.entities.ts
│   ├── properties/
│   │   ├── properties.controller.ts
│   │   ├── properties.module.ts
│   │   ├── properties.service.ts
│   │   ├── dtos/
│   │   │   ├── create-property.dto.ts
│   │   │   ├── filter.dto.ts
│   │   │   └── update-property.dto.ts
│   │   └── entities/
│   │       └── property.entity.ts
│   ├── reviews/
│   │   ├── reviews.controller.ts
│   │   ├── reviews.module.ts
│   │   ├── reviews.service.ts
│   │   ├── dtos/
│   │   │   └── create-reviews.dto.ts
│   │   └── entities/
│   │       └── reviews.entity.ts
│   ├── upload/
│   │   ├── upload.controller.ts
│   │   ├── upload.module.ts
│   │   └── upload.service.ts
│   └── user/
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.ts
│       └── dtos/
│           ├── change-password.dto.ts
│           ├── create-user.dto.ts
│           └── update-user.dto.ts
├── config/
│   ├── cloudinary.config.ts  # Cloudinary configuration
│   └── swagger.config.ts     # Swagger UI configuration
├── constant/
│   └── cloudinary.constant.ts
├── decorators/
│   └── loggedInuser.decorator.ts
├── guards/
│   └── jwt-authentication.guard.ts
├── strategies/
│   └── jwt-strategy.ts
├── types/
│   ├── enum/
│   │   ├── authorization.enum.ts
│   │   ├── property-condition.ts
│   │   ├── property-kind.ts
│   │   └── property-purpose.ts
│   └── types/
│       ├── filter-query.ts
│       ├── jwt.type.ts
│       ├── location.ts
│       └── user-response.ts
└── utils/
├── email-validation.ts
├── otp-generator.ts
└── update-response.ts
```

