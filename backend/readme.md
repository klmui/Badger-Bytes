# Backend
The backend uses a combination of the `routes`, `models`, and `controllers` folders. It handles interactions with our web server and database.

The `routes` folder holds the routes that users may target. A route is just a url such as "localhost:8080/testRoute". The four types of requests that could be made by a user are "GET", "POST", "PUT", and "DELETE". Once a route is hit, a method in the `controllers` folder will simply be called.

The `controllers` folder includes all of the functions that are called by the `routes` folder. Each function in this folder may interact with the database using functions defined in the `models` folder. They should also specify what should be returned to the frontend after receiving data from the database. The convention is to end each method name in the `controllers` with "Action" e.g. "getMenuAction".

The `models` folder includes all of the functions that are called by the `controllers` folder. Each function in this folder is simply a query. They will use prepared statements to prevent SQL injections.