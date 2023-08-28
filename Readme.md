# MERN Blog 

This is a full-stack MERN (MongoDB, Express, React, Node.js) blog application with user authentication using JSON Web Tokens (JWT). Users can create, read, and edit blog posts. This README provides an overview of the application's features and instructions for running it.

## Features

- **User Authentication**: Users can register, log in, and log out. JWT is used for secure authentication.

- **Create Blog Posts**: Authenticated users can create and publish their blog posts. Posts include a title, summary, content, and an optional cover image.

- **Read All Posts**: All users can view a list of all blog posts, including those created by other users.

- **Edit Own Posts**: Authenticated users can edit and update their own blog posts.

## Prerequisites

Before running the application, ensure you have the following installed:

- Node.js and npm: [Download Node.js](https://nodejs.org/)

- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

# Usage
1. Register a new user account on the application.

2. Log in with your newly created account.

3. Create a new blog post with a title, summary, content, and an optional cover image.

4. Click on a blog post to read it in detail.

5. If you are the author of a blog post, you will see an "Edit" button on that post. Click it to edit and update the post.

6. Log out when you are done.

# Folder Structure
The project is structured as follows:

* `api`: Contains the Node.js server code.
* `client`: Contains the React frontend code.
* `models`: Defines the MongoDB data models.
* `routes`: Defines the server routes.
* `controllers`: Contains the route handling logic.
* `uploads`: Stores uploaded images.
* `client/public`: Static files for the client.

# Technologies Used
- MongoDB: Database for storing blog post data.
- Express.js: Backend server framework.
- React: Frontend framework for building the user interface.
- Node.js: JavaScript runtime for the server.
- JSON Web Tokens (JWT): For user authentication.
- Bcrypt.js: For password hashing.
- Multer: Middleware for handling file uploads.


# Contributing
Feel free to contribute to this project by opening issues or pull requests. Your contributions are greatly appreciated.

# License
This project is licensed under the MIT License 



