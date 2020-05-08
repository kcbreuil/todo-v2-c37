# to-do API


(endpoints)
need to define the request and response

#APIs

# Get all the items 

## GET `/api/items/`
Sample response body: 
```
[{
    "id" : 1,
    "item": "remember the milk",
    "completed": false 
}, {
     "id" : 2,
    "item": "remember the eggs",
    "completed": true 
}]

## POST `/api/items`
Sample request body: 
```
{
    "item": "the name of the thing we just added"

}

```
Once it does that, it returns the following response: 

```
{
    "id": 3 
    "item": "the name of the thing we just added"
    "completed": false
}

```

## Delete an Item

DELETE `/api/item/:id`

Once it does that, it returns the item that was deleted:

```
{
    "id": 3,
    "item": "the name of the thing we just added",
    "completed": true
}

Update an Item (completing a task)
Put `/api/item/:id`

sample request body:

{
    "item": "get some beer"
    "completed": true
}

```

returns the updated item