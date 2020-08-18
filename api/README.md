### BackEnd Comunicate API

API with NodeJS generates queries to MySQL Instance DB

# db_connection.js

    SQL Syntax to create Tables INTO DB comunicate_db
    Note: comunicate_db must be created to do this possible

# Routes

## /create

    POST createUser in DB

## /update

    PUT update ID to AWS sub token sended from client-side

## authenticateToken

    middleware function to validate if token sended is valid to send the response

## /login/:id

    GET return Db id to do transactions in client-side such as send requests or get Friends querying by sub id

## /addFriend

    POST send request to another user and register into DB

## /confirmFriend

    PUT confirm friend request

## /getFriends/:id

    GET get All friends connected with the param id

## /sendMessage/

    POST request to send message between users

## /getMessages/:id/:idAmigo

    GET getMessages between two users

## /getAllMessages/:id

    GET get All messages who "id" user has received

## /searchPeople/:id

    GET get all people in DB exepting our user

## /searchPeople/:name

    GET get people by name in DB

## /getRequests/:id

    GET get Friend Requests sended to "id" user

## /deleteRequests/:idAmigo/:id

    DELETE delete friend request received from another user

## /deleteFriends/:idAmigo/:id

    DELETE delete a friend
