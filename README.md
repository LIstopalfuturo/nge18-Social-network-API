# Social Network API

## Description
A RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. Built with Express.js, MongoDB, and Mongoose ODM.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation
1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Ensure MongoDB is installed and running on your system
4. Start the server
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

## Usage
The API provides the following functionality:
- User management (create, read, update, delete)
- Thought management (create, read, update, delete)
- Reaction management (add, remove)
- Friend management (add, remove)

## API Routes

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:userId` - Get single user
- POST `/api/users` - Create user
- PUT `/api/users/:userId` - Update user
- DELETE `/api/users/:userId` - Delete user
- POST `/api/users/:userId/friends/:friendId` - Add friend
- DELETE `/api/users/:userId/friends/:friendId` - Remove friend

### Thoughts
- GET `/api/thoughts` - Get all thoughts
- GET `/api/thoughts/:thoughtId` - Get single thought
- POST `/api/thoughts` - Create thought
- PUT `/api/thoughts/:thoughtId` - Update thought
- DELETE `/api/thoughts/:thoughtId` - Delete thought
- POST `/api/thoughts/:thoughtId/reactions` - Add reaction
- DELETE `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove reaction

## Demo Video
[Click here to watch the demonstration video](https://1drv.ms/v/c/2cebbbbed41529a2/EfK279O4LjhGrNqau4PimsoBEl-W3Npc6C47K-ZEq9mgVg?e=QYUYcs)


## Technologies Used
- Express.js
- MongoDB
- Mongoose ODM
- Node.js
- JavaScript

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
