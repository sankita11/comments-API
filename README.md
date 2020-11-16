# Comment API
This is a small scale Javascript based comment API service. This is written in [Node.js](https://nodejs.org/en/) and uses [MySQL](https://www.mysql.com/) as databases

# How to use

### 1. Install Dependencies
```
npm install
```

### 2. Install MySQL
Click here to install MySQL if not installed already https://dev.mysql.com/doc/refman/8.0/en/installing.html

Connect to MySQL database and create a new database
```
CREATE DATABASE DATABASENAME;
```

### 3. Migrate DB
```
cd comment-api

db-migrate up 
```

This will create ```comments``` table in the database

### 4. Update config
Update the **user, password and databasename** in **database.json** and **config/config.js**

### 5. Run API server
```
npm start
```

The server should be running on ```http://localhost:3002/```

### 5. Test API
```
npm test
```

## Rest API Endpoints

#### ```GET```

* ```/comment/all```: Retrieve all stored comments
* ```/comment/:id```: Retrieves the comment corresponding to the id provided

#### ```PUT```

* ```/comment```: Adds an entry

REQUEST BODY:

{
    "name" : "name",
    "email" : "test@test.com",
    "comment" : "New comment"
}

#### ```PATCH```

* ```/comment/:id```: Updates an existing entry

REQUEST BODY:

{
    "name" : "name",
    "email" : "test@test.com",
    "comment" : "New comment"
}

#### ```DELETE```

* ```/comment/:id```: Deletes the entry corresponding to the id provided






