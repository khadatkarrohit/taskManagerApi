# Task Manager API
In this project, we will create a RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to perform CRUD operations (Create, Read, Update, and Delete) on tasks. The tasks should have a title, description, and a flag for completion status. 

API Endpoints

| Sr No.     | Methods     | Urls             |Description            |
| -----------| ----------- | -----------      | -----------        |
| 1         | GET         | api/tasks        | Retrieve all tasks.           |
| 2         | GET         | api/tasks/:id    | Retrieve a single task by its ID         |
| 3         | POST        | api/tasks        |Create a new task         |
| 4         | PUT         | api/tasks/:id    | Update an existing task by its ID |
| 5         | DELETE      | api/tasks/:id    |Delete a task by its ID |
| 6         | GET         | api/tasks?sort=created_at&orderby=desc    |Sort Array data by created_date as ASC or DESC |
| 7         | GET         | api/tasks/priority/:level    | Retrieve tasks based on priority level |

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
