# Socket.io Server

This is the socket.io server which brings the communication between clients

# Usage
In the folder use the command `npm install` to install all the dependencies.

To run the server execute `npm start`

## MongoDB connection
In order to use the mongoDB database you need to install it from mongodb.com.

After installing:
- You can create a `angular4-chat` database and an `authentication` collection

or

- You can create you custom database and collection and change the connection string in server.js file

## Creating users
You can uncomment the route to create users in server.js file in order to create some users or create them in mongo shell.
Remember to comment the route not to have unwanted users.
