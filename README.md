# user-task-api
NodeJS api to manage user's and their tasks

##Instructions for getting to app up and running##
In your shell command run:
```jshint
git clone https://github.com/gevannmullins/user-task-api.git
```
Once you have all the files copied to your server, run the following commands from your shell script:
```jshint
cd user-task-api
```
and then:
```jshint
npm install
```
Before you can run the app, you need to ensure that you have a MySQL database ready for the app.
You can import the .sql file provided in this repository and just ensure that your database name is "users_tasks".
Also, ensure that the database details in the "db_connection_mysql.js" matches the details of your Mysql Server.

As soon as npm install has completed installing all the required packages and you are sure about the database setup,
you can startup the app by running:
```jshint
node server.js
```
Please note that the hostname might be different to yours,
I have a localhost server running and that I have been using to test my app.
for testing:
```jshint
http://localhost:8000/api
```
for users:
```jshint
http://localhost:8000/api/users
```
for tasks:
```jshint
http://localhost:8000/api/users/{id}/tasks
```


