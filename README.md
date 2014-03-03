* Search and Update App developed in NodeJS using ExpressJS. 
* Uses MongoDB (NoSQL) database to store paragraph. 

It has 2 interfaces:
* Search : For query
* Add Content: To add content to database

Search uses Mongo's built in search feature which automatically indexes and ranks the documents.

* Hosted at http://lit-forest-8534.herokuapp.com/
(Uses only one dyno of Heroku Platform, hence it goes to sleep after 1 hour of inactivity. So, it may take time to respond initially. After that it runs perfectly fine.)
