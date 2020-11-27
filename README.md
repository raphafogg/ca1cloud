# Project Name
> Here goes your awesome project description!

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General info
This is a final project for the subject Cloud-based Web Applications - A bug tracker


## Technologies
* Mongo DB:  is a cross-platform document-oriented database program.
* Express js: a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
* Body-parser: the Node. js body parsing middleware.

## Setup
Dowload it from https://github.com/raphafogg/ca1cloud . Move to an appropriate directory. Open your terminal and run npm start.

## Code Examples
Issues routers

app.get('/issues', issues.getControl);
app.get('/issues/:slug', issues.getByIs);
app.get(`/projects/:slug/issues`, issues.getByPr);
app.post('/projects/:sNome/issues', issues.postController);

Users routers

app.get(`/users`, users.getControl);
app.get(`/users/:email`, users.getByEmail);
app.post('/users', users.postController);


## Changelog

On the 27/11:

Commits on Nov 27, 2020
living in hope of deliverance

@raphafogg
raphafogg committed 8 minutes ago
 
Commits on Nov 1, 2020
final version

@raphafogg
raphafogg committed 26 days ago
 
Commits on Oct 31, 2020
add control / models for users

@raphafogg
raphafogg committed 27 days ago
 
Commits on Oct 30, 2020
Fixe port

@raphafogg
raphafogg committed 28 days ago
 
First commit

@raphafogg
raphafogg committed 28 days ago


## Roadmap

fronted development - > unit testing - > add issue - > add due - > add watchers

## Contact
By [@rapha_fogg]
contact: raphacaetanoto@gmail.com