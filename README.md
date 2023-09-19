## NyumbaHub Serverless Backend

NyumbaHub API is a RESTful API built with Node/Express.js employing the MVC design pattern. It is hosted as a serverless function. The server uses mongoose ODM(Object-Data Modelling) to communicate with MongoDB database.

NOTE: Although we use mongoose library, mongodb driver is required for database connection establishment, connection management and making queries, therefore Mongodb dependency is installed (you won't see it throughout the application but it provides these 3 low-level database operations).

With the help of mongoose, schemas for the 4 models used throughout the application are defined. Logic and functionality for the views are implemented in the controllers dir with a folder for each group namely user, property, type and category controllers. - MVC

The backend has public routes that are accessible by the public and private routes which are protected by JSON Web Token (JWT) and are accessed either after signing in or can only be accessed by privileged users.

Images are uploaded to cloudinary. Thanks to multer, the image files(maximum is 10) are received and stored in multer storage with a formatted name(request fieldname + time now + 10 random digits) and file type(.jpg). They are then fetched and resized to 400 X 400 by sharp one at a time. Upon successful upload to cloudinary, the image url is appended to the image urls array for that property and the multer stored's image is deleted.

The backend accepts URL query from a request to query the database and return filtered and/or sorted response data, or select the fields to return in a response.

The API also includes a UI where users can interact with it efficiently. [Visit the API](https://nyumbahub.netlify.app)

Also see the [overall application's ReadMe](https://github/ptrgi/nyumbahub-frontend)

##

### Features Include

- Serverless
- Authentication and authorization
- Protected routes with JSON Web Token (JWT)
- Access token regeneration with a refresh token stored in a cookie
- MongoDB database connection
- User reset forgotten password
- Images upload
- User interface

##

### Technologies Used

- NodeJS
- Express.js
- Mongoose
- Mongodb
- Cloudinary
- Multer
- Sharp
- JWT
- Serverless-http
- Cors
- Cookie-parser
- Netlify-cli
- Nodemailer

##

### Installation

1. Clone the repository `https://github.com/pptrgi/nyumbahub_api_serverless_function.git`
2. Then navigate to the cloned project's dir `cd nyumbahub_api_serverless_function`
3. Run `npm install` to install all dependencies
4. Start the Netlify dev server with `npm start`. Note: you'll need a Netlify account

##

### Usage

Once you have cloned, installed and successfully started your dev server you can modify the
application to your liking.

##

### Contributing & Acknowledgements

[See the overall application's contributing and acknowledgements](https://github/ptrgi/nyumbahub_api_serverless_function)
