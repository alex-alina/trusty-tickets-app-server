## Trusty Tickets - Server

This is the server for a ticketing app where customers can sell and buy tickets to events. 
A fraud risk is calculated for each ticket and helps customers know which ones are safe to purchase.
Current state is **WIP**.

## Tech stack
* TypeScript
* Koa
* routing-controllers
* TypeORM
* PostgreSQL 

## Endpoints: 

* `POST /users`: sign up as new user
* `POST /logins`: log in and receive a JWT
* `POST /events`: add new event
* `GET /events`: list all events
* `GET /events/:id([0-9]+)`: list an event's details
* `POST /events/:eventId([0-9]+)/tickets`: add new ticket
* `GET /events/:eventId([0-9]+)/tickets`: list all tickets
* `GET /events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)`: list a ticket's details
* `POST /events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments`: add new comment
* `GET /events/:eventId([0-9]+)/tickets/:ticketId([0-9]+)/comments`: list all comments

## Description
The app has a login and signup page for customers. 
* Users need to login to create events, tickets and comments. 
* Anybody can view events, tickets and comments, but users need to be logged in to add them.

The main page displays a list of events that have a name, description, picture and start/end date. 

Clicking on an event shows a user to a list of tickets available for that event. 

A ticket has an author, price, description and picture (optional).

Clicking on a ticket shows a user the details of that ticket and which event it's for. On this page customers can also add comments. 

A comment on a ticket has an author and some text. 

## Setup
* You need a working Postgres database that is preferably empty and running. 
* Install the dependencies using `npm install`
* Start the server using `npm start`
* Start compiling using `nmp run compile`
* You can now access endpoints with HTTPie commands on `localhost:4000`

## Motivation
My goal is to finish this project as part of effective practice with building and deploying a full stack app.
#####Practice goals:
* Refactoring code to improve security and querying efficiency.

## License
MIT Licence - Copyright &copy; 2018 - Alina Rusu.


