# Group "MaxWAstappen"

## Members
- s336362 MARC'ANTONIO LOPEZ
- s123456 GABRIELE TROVATO

# Exercise "Poke"

# Lab Journal

## Database Schema

### Ingredients
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **ingredient**: TEXT

### Proteins
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **protein**: TEXT

### Bases
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **base**: TEXT

### Sizes
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **size**: TEXT

### Dailylimits
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **maxregularbowls**: INTEGER
- **maxmediumbowls**: INTEGER
- **maxlargebowls**: INTEGER
- **currentregularbowls**: INTEGER CHECK \(currentregularbowls \<= maxregularbowls\)
- **currentmediumbowls**: INTEGER CHECK \(currentmediumbowls \<= maxmediumbowls\)
- **currentlargebowls**: INTEGER CHECK \(currentlargebowls \<= maxlargebowls\)

### Bowls
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **base_id**: INTEGER
- **protein_id**: INTEGER
- **ingredient_id**: INTEGER
- **size_id**: INTEGER
- **amount**: INTEGER
- **UNIQUE \(base_id, protein_id, ingredient_id, size_id\)

### Orders
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **revenue**: FLOAT
- **date**: DATE

### OrderBowls
- **order_id**: INTEGER
- **bowl_id**: INTEGER
- **FOREIGN KEY \(order_id\) REFERENCES Orders\(id\)
- **FOREIGN KEY \(bowl_id\) REFERENCES Bowls\(id\)
- **PRIMARY KEY \(order_id, bowl_id\)

## API Documentation

### Collections

#### GET /[table]
Retrieves all items from specified table (collection).
```http
GET /Ingredients HTTP/1.1
```
**Response** `200 OK`
```json
[
    { "id": 1, "ingredient": "Avocado" },
    { "id": 2, "ingredient": "Mango" }
]
```

#### POST /[table]
Creates a new item in the specified table.
```http
POST /Orders HTTP/1.1
Content-Type: application/json

{
    "date": "2023-05-20T10:30:00.000Z",
    "total": 15.99,
    "status": "pending"
}
```
**Response** `201 Created`
```json
{
    "id": 1
}
```

### Elements

#### GET /[table]/[id]
Retrieves a specific item by ID.
```http
GET /Bases/1 HTTP/1.1
```
**Response** `200 OK`
```json
{
    "id": 1,
    "base": "White Rice"
}
```

#### PUT /[table]/[id]
Updates all attributes of an existing item.
```http
PUT /Bowls/1 HTTP/1.1
Content-Type: application/json

{
    "base_id": 1,
    "protein_id": 2,
    "ingredient_id": 3,
    "size_id": 1,
    "amount": 2
}
```
**Response** `200 OK`
```json
{
    "changes": 1
}
```

#### PATCH /[table]/[id]
Updates specific attributes of an existing item.
```http
PATCH /Orders/1 HTTP/1.1
Content-Type: application/json

{
    "status": "completed"
}
```

### Search

#### GET /[table]/search
Searches items in a table using custom criteria.
```http
GET /Proteins/search?column=protein&condition=LIKE&value=chicken HTTP/1.1
```
**Response** `200 OK`
```json
[
    { "id": 1, "protein": "Grilled Chicken" },
    { "id": 2, "protein": "Chicken Teriyaki" }
]
```
**Error** `400 Bad Request`
```json
{
    "errors": [
        {"msg": "Column is required"},
        {"msg": "Condition is required"},
        {"msg": "Value is required"}
    ]
}
```