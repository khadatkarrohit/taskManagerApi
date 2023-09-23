# Task Manager API
In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, and a flag for completion status. 

API Endpoints

| Methods     | Urls             |Description            |
| ----------- | -----------      | -----------        |
| GET         | /tasks    | Retrieve all tasks.           |
| GET         | /tasks/:id | Retrieve a single task by its ID         |
| POST        | /tasks    |Create a new task         |
| PUT        | /tasks/:id    | Update an existing task by its ID |
| DELETE        | /tasks/:id    |Delete a task by its ID |

## Quick Start

Clone the repo.

```bash
https://github.com/khadatkarrohit/taskManagerApi.git
cd taskManagerApi
```
Create the .env file.

```bash
PORT = 8081
```
Install the dependencies.

```bash
npm install
```
To start the express server, run the following.

```bash
npm run dev
```