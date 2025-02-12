# REST API for Home Goods Store

**Service might be updated while the frontend is being built!!!**

This is a RESTful API built with **Node.js**, **Express**, **Mongoose**, and **MongoDB** for an online store selling bedroom items (such as bedding), decorations for your house and dining room items (such as plates and cutlery). The API supports various endpoints to manage products in the store, including CRUD operations.There will be an admin panel where only the user who is logged in with the admin account will be able to create, update and delete the items. All other users will have accounts so they can order stuff easier as their data will be prepopulated in the neccassary fields in the order screen.

#Admin account
email: admin@admin.admin
password: 123456

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

#Endpoints
**USER SERVICES**
* POST http://localhost:3000/login
  -> Log into your account. Successfull response returns object with _id, email, name, town, streetName, streetNumber, tel, accessToken, otherwise you will receive object with message(array with messages/texts) and code(status code).
* POST http://localhost:3000/register
  -> Create an account in the platform. For registration you need the following: email, name, town, streetName, streetNumber and tel. Response returns object with _id, email, name, town, streetName, streetNumber, tel, accessToken, otherwise you will receive object with message(array with messages/texts) and code(status code).
* GET http://localhost:3000/logout
  -> Logout of your account. You will receive object with message(array with messages/texts) and code(status code).
**PRODUCT ENDPOINTS**
* GET http://localhost:3000/bedroom / http://localhost:3000/decor / http://localhost:3000/dining-room
  -> Get all products which are in one of the three categories (based on your choice). On successful response you will receive the items as objects in an array. Schema will be below for reference. If the request is unsuccessfull you will receive object with message(array with messages/texts) and code(status code).
* GET http://localhost:3000/bedroom/:id / http://localhost:3000/decor/:id / http://localhost:3000/dining-room/:id
  -> Get certain product from one of the three categories (based on your choice). On successful response you will receive the item as object. Schema will be below for reference. If the request is unsuccessfull you will receive object with message(array with messages/texts) and code(status code).
* POST http://localhost:3000/admin/bedroom / http://localhost:3000/admin/decor / http://localhost:3000/admin/dining-room
  -> ONLY FOR ADMIN USER. You can create an item for each of the sections depending on your choice. In order to create the item you need to send the following: tittle, col, price, description, characteristics, picture. If the request is successfull you will receive an object with message (array with messages/texts), status code   
  and also itemID.
* DELETE http://localhost:3000/admin/bedroom/:id / http://localhost:3000/admin/decor/:id / http://localhost:3000/admin/dining-room/:id
  -> ONLY FOR ADMIN USER. You will receive an object with code(status code) and message(array with messages/texts)
* PUT http://localhost:3000/admin/bedroom/:id / http://localhost:3000/admin/decor/:id / http://localhost:3000/admin/dining-room/:id
  -> ONLY FOR ADMIN USER. You can update an item for each of the sections depending on your choice. In order to update the item you need to send the following: tittle, col, price, description, characteristics, picture. If the request is successfull you will receive an object with message (array with messages/texts), status code   
  and also itemID. If the request is not successfull you will receive an object with message (array with messages/texts) and code (status code).

#Schema
**USER SCHEMA** 
* email: string, password: string, name: string, town: string, streetName: string, streetNumber: string, tel: number
**PRODUCT SCHEMA*
* tittle: string, col: string, price: number, description: string, characteristics: string, picture: buffer, contentType: string (mimetype of the picture). 


