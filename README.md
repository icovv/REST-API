# REST API for Home Goods Store

**Service might be updated while the frontend is being built!!!**

This is a RESTful API built with **Node.js**, **Express**, **Mongoose**, and **MongoDB** for an online store selling bedroom items (such as bedding), decorations for your house and dining room items (such as plates and cutlery). The API supports various endpoints to manage products in the store, including CRUD operations.There will be an admin panel where only the user who is logged in with the admin account will be able to create, update and delete the items. All other users will have accounts so they can order items easier as their data will be prepopulated in the neccassary fields in the order screen.

#Admin account <br>
email: admin@admin.admin <br>
password: 123456 <br>

# Installation
**Make sure you have a MongoDB instance running!**
1. **Clone the repository**
2. **npm install** in order to install all neccessary dependancies
3. **npm start** in order to start the application

# Technologies used
* Node.js: JavaScript runtime for building scalable server-side applications.
* Express.js: Web framework for building RESTful APIs.
* Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
* MongoDB: NoSQL database to store data for the store.

# Endpoints
**USER SERVICES** <br>
* POST http://localhost:3000/login <br>
  -> Log into your account. Successfull response returns object with _id, email, name, town, streetName, streetNumber, tel, accessToken, admin otherwise you will receive object with message(array with messages/texts) and code(status code). Validation included is if the there is no such user with that email in the DB (or if no email has been provided), if the request is from a user who is logged in (if the user is logged in the frontend provides "X-Authorization" header with accessToken), if invalid password has been provided you will receive an error message (comparing the provided password with the one in the DB). Email and Password are both sanitized before making the request to the DB. <br>
* POST http://localhost:3000/register <br>
  -> Create an account in the platform. For registration you need the following: email and password. Response returns object with _id, email, name, town, streetName, streetNumber, tel, accessToken, admin otherwise you will receive object with message(array with messages/texts) and code(status code). Validation included is if the there is such user with that email in the DB, if the request is from a user who is logged in (if the user is logged in the frontend provides "X-Authorization" header with accessToken), if the email provided is not an email and if the password`s length is less than 6 chars. Both the email and the password are sanitized before making the request to the DB. <br>
* GET http://localhost:3000/logout <br>
  -> Logout of your account. You will receive object with message(array with messages/texts) and code(status code). Validation included is if the user has already been logged in. <br>
* GET http://localhost:3000/profile/:id <br>
  -> Get the profile data of the user.Successfull response returns object with _id, email, name, town, streetName, streetNumber, tel, accessToken, admin otherwise you will receive object with message(array with messages/texts) and code(status code). Validation included is if the there is no such user with that ID in the DB (or if no userID has been provided), if the user has already been logged in.<br>
* PUT http://localhost:3000/profile/:id <br>
  -> Change the profile data of the user. Successfull response returns object with updated data which includes _id, email, name, town, streetName, streetNumber, tel, accessToken, admin otherwise you will receive object with message(array with messages/texts) and code(status code). Validation included is if the there is no such user with that ID in the DB (or if no userID has been provided), if the user has logged in, if name,town,streetName,streetNumber and tel are empty strings (user tries to erase his data from the db) else if name,town,streetName are strings and if tel is 10 characters long and the value provided is a number and if streetNumber is also a number. All values are sanitized before making the request to the DB.<br>
<br> **PRODUCT ENDPOINTS** <br>
* GET http://localhost:3000/bedroom / http://localhost:3000/decor / http://localhost:3000/dining-room <br>
  -> Get all products which are in one of the three categories (based on your choice). On successful response you will receive the items as objects in an array. Schema will be below for reference. If the request is unsuccessfull you will receive object with message(array with messages/texts) and code(status code). <br>
* GET http://localhost:3000/bedroom/:id / http://localhost:3000/decor/:id / http://localhost:3000/dining-room/:id <br>
  -> Get certain product from one of the three categories (based on your choice). On successful response you will receive the item as object. Schema will be below for reference. If the request is unsuccessfull you will receive object with message(array with messages/texts) and code(status code). <br>
* POST http://localhost:3000/admin/bedroom / http://localhost:3000/admin/decor / http://localhost:3000/admin/dining-room <br>
  -> ONLY FOR ADMIN USER. You can create an item for each of the sections depending on your choice. In order to create the item you need to send at least the following: tittle, price and image. If the request is successfull you will receive an object with message (array with messages/texts), status code   
  and also itemID. <br>
* DELETE http://localhost:3000/admin/bedroom/:id / http://localhost:3000/admin/decor/:id / http://localhost:3000/admin/dining-room/:id <br>
  -> ONLY FOR ADMIN USER. You will receive an object with code(status code) and message(array with messages/texts) <br>
* PUT http://localhost:3000/admin/bedroom/:id / http://localhost:3000/admin/decor/:id / http://localhost:3000/admin/dining-room/:id <br>
  -> ONLY FOR ADMIN USER. You can update an item for each of the sections depending on your choice. In order to update the item you need to send at least the following: tittle, price. If the request is successfull you will receive an object with message (array with messages/texts), status code   
  and also itemID. If the request is not successfull you will receive an object with message (array with messages/texts) and code (status code). <br>

# Schema
**USER SCHEMA**  <br>
* email: string, password: string, name: string, town: string, streetName: string, streetNumber: string, tel: number <br>, admin: boolean <br>
<br> **PRODUCTS SCHEMA** <br>
* tittle: string, col: string (this is the collection of the product), price: number, description: string, characteristics: string, picture: buffer, contentType: string (mimetype of the picture).  <br>


