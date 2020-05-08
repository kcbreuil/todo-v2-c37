/**
 * Required External Modules
 */

const express = require("express");
const path = require("path");

/**
 * App Variables
 */

const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let items = [];
let id = 0;

/**
 * Routes Definitions
 */

app.get("/", (request, response) => {
  response.status(200).send("TO DO App");
});

app.get("/api/items", (request, response, next) => {
  // Return all of the todo items
  response.json(items);
});

app.post("/api/items", (request, response, next) => {
  // Get the request body and then add the appropriate
  // item JS object to our items array
  const incomingItem = request.body;
  if (incomingItem.item) {
    id = id + 1;
    const newItem = {
      id: id,
      item: incomingItem.item,
      completed: false,
    };
    items.push(newItem);
    response.json(newItem);
  } else {
    response.status(400).json({ error: "item needs a description" });
  }
});

app.delete("/api/items/:id", (request, response, next) => {
  // Locate the request, which will give us the ID
  const itemId = Number(request.params.id);

  // With that ID, we'll have to go into our array and
  // go through each object to see if it has the ID.
  const itemToDelete = items.find((item) => {
    return item.id === itemId;
  });

  // If it does, we delete it.
  if (itemToDelete) {
    // We'll use the splice method, which requires
    // knowning where itemToDelete's index is within
    // the index array.
    const itemIndex = items.indexOf(itemToDelete);
    items.splice(itemIndex, 1);
    response.json(itemToDelete);
  } else {
    // If we don't see anything, return a 404.
    response.status(404).json({ error: "ID not found" });
  }
});

app.put("/api/items/:id", (request, response, next) => {
  // Update the list by ID
  // Locate the request, which will give us the ID
  const itemId = Number(request.params.id);
  // With that ID, we'll have to go into our array and
  // go through each object to see if it has the ID.
  const itemToComplete = items.find((item) => {
    return item.id === itemId;
  });

  if (itemToComplete) {
    // toggles the value
    itemToComplete.completed = !itemToComplete.completed;

    // We'll use the splice method, which requires
    // knowning where itemToDelete's index is within
    // the index array.
    const itemIndex = items.indexOf(itemToDelete);
    items.splice(itemIndex, 1, itemToComplete);
    response.json(itemToComplete);
  } else {
    // If we don't see anything, return a 404.
    response.status(404).json({ error: "ID not found" });
  }
});

/**
 * Server Activation
 */

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
