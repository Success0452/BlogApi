# Getting Started
## Prerequisites
- Before using the BlogAPI, make sure you have the following prerequisites in place:

Node.js and npm or yarn installed on your system.
PostgreSQL database configured and running.
Installation
To install and set up the BlogAPI, follow these steps:

`Clone the repository:`

- Copy code
- git clone https://github.com/Success0452/BlogApi.git

- cd blogapi
- Configure environment variables by creating a .env file with the necessary settings.

`Install dependencies:`

- Copy code
- npm install
- Run tests to ensure functionality:

- Copy code
- npm test
- Start the server:

- Copy code
- npm start


## Authentication
If the API requires authentication, obtain an API key or token as per the authentication mechanism used. Include this key or token in the request headers for routes that require authentication.

# Routes

`USER ROUTE`

### Register User
- Route: /api/users/register
- Request Type: POST
## Description:
- This endpoint allows users to register by providing their full name, username, email, and password. User input is validated using Joi, and if validation passes, the user is created in the database with a hashed password.

`Request Body:`

- full_name (string): The full name of the user.
- username (string): The desired username for the user.
- email (string): The email address of the user.
- password (string): The user's password.

`Response:`

`msg (string): A message indicating the result of the registration process.`
`status (number): The HTTP status code (Accepted - 202) indicating success.`

### Login User
- Route: /api/users/login
- Request Type: POST

## Description:
- This endpoint allows registered users to log in by providing their email and password. User input is validated using Joi, and if validation passes, the provided email is used to retrieve the user's hashed password from the database. If the password is verified successfully, a JSON Web Token (JWT) is generated and returned as part of the response.

`Request Body:`

`email (string): The email address of the user.`
`password (string): The user's password.`

`Response:`

`token (string): A JSON Web Token (JWT) for the logged-in user.`
`msg (string): A message indicating the result of the login process.`
`status (number): The HTTP status code (OK - 200) indicating success.`


### Upload User Profile Image
- Route: /api/users/upload-user-image
- Request Type: POST

## Description:
- This endpoint allows users to upload their profile images to the cloud using Cloudinary. The image is uploaded to Cloudinary, and information about the uploaded image is returned in the response.

`Request Body:`

`This endpoint does not require a request body.`

Response:

`msg (string): A message indicating the result of the upload process.`
`status (number): The HTTP status code (Accepted - 202) indicating success.`
`url (string): The URL of the uploaded image.`
`public_id (string): The public ID of the uploaded image in Cloudinary.`
`type (string): The type of the uploaded image.`
`filename (string): The original filename of the uploaded image.`

- These API endpoints provide registration, login, and image upload functionalities for users in your application. Users can register, log in, and upload profile images as needed.


`BLOG Route`

### Retrieve Posts
- Route: /api/posts
- Request Type: GET

## Description:
- This endpoint allows users to retrieve a list of posts. Users can specify the page number and page size for pagination.

`Request Body:`

`This endpoint does not require a request body.`

`Query Parameters:`

- page (optional): The page number for pagination (default is 1).
- pageSize (optional): The number of posts to retrieve per page (default is 14).


`Response:`

`msg (string): A message indicating the result of the retrieval process.`
`status (number): The HTTP status code (Accepted - 202) indicating success.`
`posts (array): An array of post objects containing post details.`


`Retrieve User's Posts`

- Route: /api/my-posts
- Request Type: GET

### Description:
- This endpoint allows users to retrieve their own posts. Users can specify the page number and page size for pagination.

`Request Body:`

- This endpoint does not require a request body.

`Query Parameters:`

- page (optional): The page number for pagination (default is 1).
- pageSize (optional): The number of posts to retrieve per page (default is 14).

`Response:`

`msg (string): A message indicating the result of the retrieval process.`
`status (number): The HTTP status code (Accepted - 202) indicating success.`
`posts (array): An array of post objects containing post details.`

### Retrieve Post by ID
- Route: /api/posts/:postId
- Request Type: GET

### Description:
- This endpoint allows users to retrieve a specific post by its ID.

`Request Body:`

- This endpoint does not require a request body.

`Parameters:`

`postId (string): The ID of the post to retrieve.`

`Response:`

`msg (string): A message indicating the result of the retrieval process.`
`status (number): The HTTP status code (Accepted - 202) indicating success.`
`post (object): A post object containing post details.`

## Add Post
- Route: /api/posts
- Request Type: POST

### Description:
- This endpoint allows users to create a new post.

`Request Body:`

title (string): The title of the post.
content (string): The content of the post.
image (string, optional): The URL of an image associated with the post.
Response:

msg (string): A message indicating the result of the creation process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Update Post
Route: /api/posts/:postId
Request Type: PATCH
Description:
This endpoint allows users to update a specific post by its ID.

Request Body:

content (string): The updated content of the post.
Parameters:

postId (string): The ID of the post to update.
Response:

msg (string): A message indicating the result of the update process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Soft Delete Post
Route: /api/posts/:postId/soft
Request Type: PATCH
Description:
This endpoint allows users to perform a soft delete on a specific post by its ID. The post will be marked as deleted but not completely removed from the database.

Request Body:

This endpoint does not require a request body.

Parameters:

postId (string): The ID of the post to soft delete.
Response:

msg (string): A message indicating the result of the soft delete process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Hard Delete Post
Route: /api/posts/:postId/hard
Request Type: DELETE
Description:
This endpoint allows users to perform a hard delete on a specific post by its ID. The post will be completely removed from the database.

Request Body:

This endpoint does not require a request body.

Parameters:

postId (string): The ID of the post to hard delete.
Response:

msg (string): A message indicating the result of the hard delete process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Upload Post Image
Route: /api/posts/upload-post-image
Request Type: POST
Description:
This endpoint allows users to upload an image associated with a post to the cloud using Cloudinary.

Request Body:

This endpoint does not require a request body.

Response:

msg (string): A message indicating the result of the upload process.
status (number): The HTTP status code (Accepted - 202) indicating success.
url (string): The URL of the uploaded image.
public_id (string): The public ID of the uploaded image on Cloudinary.
type (string): The type of the uploaded image.
filename (string): The filename of the uploaded image.

ADMIN Route

Create Admin
Route: /api/admin/create
Request Type: POST
Description:
This endpoint allows admin users to create a new admin user account. Only admin users can access this endpoint.

Request Body:

full_name (string): The full name of the new admin user.
username (string): The username of the new admin user.
email (string): The email address of the new admin user.
password (string): The password of the new admin user.
Response:

msg (string): A message indicating the result of the creation process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Post Admin Information
Route: /api/admin
Request Type: POST
Description:
This endpoint allows admin users to create new blog posts. Only admin users can access this endpoint.

Request Body:

title (string): The title of the blog post.
content (string): The content of the blog post.
image (string, optional): The URL of an image associated with the blog post.
Response:

msg (string): A message indicating the result of the creation process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Get All Statistics
Route: /api/admin
Request Type: GET
Description:
This endpoint allows admin users to retrieve statistics related to the application, including the number of users, blog posts, and comments. Only admin users can access this endpoint.

Request Body:

This endpoint does not require a request body.

Response:

msg (string): A message indicating the result of the retrieval process.
status (number): The HTTP status code (Accepted - 202) indicating success.
noOfUser (number): The total number of registered users.
noOfPost (number): The total number of blog posts.
noOfComment (number): The total number of comments.
Toggle User Post Access
Route: /api/admin/toggle/:id
Request Type: POST
Description:
This endpoint allows admin users to toggle the post access of a specific user by their ID. If the user's access is toggled, they will be restricted from posting.

Parameters:

id (string): The ID of the user to toggle.
Response:

msg (string): A message indicating the result of the toggle process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Delete Post
Route: /api/admin/delete/:postId
Request Type: DELETE
Description:
This endpoint allows admin users to delete a specific post by its ID. Only admin users can access this endpoint.

Parameters:

postId (string): The ID of the post to delete.
Response:

msg (string): A message indicating the result of the delete process.
status (number): The HTTP status code (Accepted - 202) indicating success.
Please note that these endpoints are restricted to admin users and require proper authentication and authorization to access them.

Comment Route

Retrieve Comments
Route: /api/posts/:postId/comments
Request Type: GET
Description:
This endpoint allows users to retrieve all comments associated with a specific blog post by its ID.

Parameters:

postId (string): The ID of the blog post to retrieve comments for.
Response:

msg (string): A message indicating the result of the retrieval process.
status (number): The HTTP status code (OK - 200) indicating success.
comments (array of objects): An array of comment objects associated with the blog post.
Retrieve Specific Comment
Route: /api/posts/:postId/:commentId
Request Type: GET
Description:
This endpoint allows users to retrieve a specific comment associated with a blog post and comment ID.

Parameters:

postId (string): The ID of the blog post.
commentId (string): The ID of the comment to retrieve.
Response:

msg (string): A message indicating the result of the retrieval process.
status (number): The HTTP status code (OK - 200) indicating success.
comment (object): The comment object retrieved.
Add Comment
Route: /api/posts/:postId/comments
Request Type: POST
Description:
This endpoint allows users to add a new comment to a specific blog post by its ID.

Parameters:

postId (string): The ID of the blog post to add the comment to.
Request Body:

text (string): The text content of the comment.
image (string, optional): The URL of an image associated with the comment.
Response:

msg (string): A message indicating the result of the addition process.
status (number): The HTTP status code (OK - 200) indicating success.
Update Comment
Route: /api/posts/:postId/:commentId
Request Type: PATCH
Description:
This endpoint allows users to update the content of a specific comment associated with a blog post and comment ID.

Parameters:

postId (string): The ID of the blog post.
commentId (string): The ID of the comment to update.
Request Body:

text (string): The updated text content of the comment.
Response:

msg (string): A message indicating the result of the update process.
status (number): The HTTP status code (OK - 200) indicating success.
Delete Comment
Route: /api/posts/:postId/:commentId
Request Type: DELETE
Description:
This endpoint allows users to delete a specific comment associated with a blog post and comment ID.

`Parameters:`

`postId (string): The ID of the blog post.`
`commentId (string): The ID of the comment to delete.`


`Response:`

`msg (string): A message indicating the result of the delete process.`
`status (number): The HTTP status code (OK - 200) indicating success.`
- Please note that users are only allowed to delete their own comments, and proper authentication and authorization should be in place to ensure that users can only modify their own comments.


`Error Handling`
In case of errors, the BlogAPI returns appropriate HTTP status codes and error messages in the response. Refer to the following common error codes for troubleshooting:

`Common Error Codes`
- 400 Bad Request: Invalid request parameters or data.
- 401 Unauthorized: Authentication required or invalid credentials.
- 403 Forbidden: Access denied due to insufficient permissions.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: Server-side issues; contact support.


Testing
Before using the API in a production environment, it's recommended to run tests to ensure its functionality and reliability. You can find more details on testing in the project's testing documentation.

Contributing
Contributions to the BlogAPI project are welcome! Please read the contributing guidelines before getting started.

That's the basic structure of a documentation guide for a RESTful API. You can expand on each section to provide more detailed information, examples, and usage tips as needed for your specific API.