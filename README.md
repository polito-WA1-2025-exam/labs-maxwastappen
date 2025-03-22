# Group "MaxWAstappen"

## Members
- s336362 MARC'ANTONIO LOPEZ
- s123456 GABRIELE TROVATO

# Exercise "Poke"

# Lab Journal

## Database Schema

### Core Tables

#### Ingredients
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| ingredient | TEXT | NOT NULL |

#### Proteins
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| protein | TEXT | NOT NULL |

#### Bases
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| base | TEXT | NOT NULL |

#### Sizes
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| size | TEXT | NOT NULL |

### Business Logic Tables

#### Dailylimits
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| maxregularbowls | INTEGER | NOT NULL |
| maxmediumbowls | INTEGER | NOT NULL |
| maxlargebowls | INTEGER | NOT NULL |
| currentregularbowls | INTEGER | CHECK (currentregularbowls <= maxregularbowls) |
| currentmediumbowls | INTEGER | CHECK (currentmediumbowls <= maxmediumbowls) |
| currentlargebowls | INTEGER | CHECK (currentlargebowls <= maxlargebowls) |

#### Bowls
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| base_id | INTEGER | FOREIGN KEY REFERENCES Bases(id) |
| size_id | INTEGER | FOREIGN KEY REFERENCES Sizes(id) |
| amount | INTEGER | NOT NULL |

#### BowlProteins
| Column | Type | Constraints |
|--------|------|-------------|
| bowl_id | INTEGER | FOREIGN KEY REFERENCES Bowls(id) |
| protein_id | INTEGER | FOREIGN KEY REFERENCES Proteins(id) |
| PRIMARY KEY | (bowl_id, protein_id) |

#### BowlIngredients
| Column | Type | Constraints |
|--------|------|-------------|
| bowl_id | INTEGER | FOREIGN KEY REFERENCES Bowls(id) |
| ingredient_id | INTEGER | FOREIGN KEY REFERENCES Ingredients(id) |
| PRIMARY KEY | (bowl_id, ingredient_id) |

#### Orders
| Column | Type | Constraints |
|--------|------|-------------|
| id | INTEGER | PRIMARY KEY AUTOINCREMENT |
| revenue | FLOAT | NOT NULL |
| date | DATE | NOT NULL |

#### OrderBowls
| Column | Type | Constraints |
|--------|------|-------------|
| order_id | INTEGER | FOREIGN KEY REFERENCES Orders(id) |
| bowl_id | INTEGER | FOREIGN KEY REFERENCES Bowls(id) |
| PRIMARY KEY | (order_id, bowl_id) |

## REST API

### Collection Endpoints

#### List All Items
```http
GET /[table] HTTP/1.1
```
Returns all items from specified table.

**Example Request:**
```http
GET /Ingredients HTTP/1.1
```

**Success Response:** `200 OK`
```json
[
    { "id": 1, "ingredient": "Avocado" },
    { "id": 2, "ingredient": "Mango" }
]
```

#### Create Item
```http
POST /[table] HTTP/1.1
```
Creates a new item in specified table.

**Example Request:**
```http
POST /Orders HTTP/1.1
Content-Type: application/json

{
    "date": "2023-05-20T10:30:00.000Z",
    "revenue": 15.99
}
```

**Success Response:** `201 Created`
```json
{
    "id": 1
}
```

### Element Endpoints

#### Get Single Item
```http
GET /[table]/[id] HTTP/1.1
```
Retrieves specific item by ID.

**Example Request:**
```http
GET /Bases/1 HTTP/1.1
```

**Success Response:** `200 OK`
```json
{
    "id": 1,
    "base": "White Rice"
}
```

#### Update Item
```http
PUT /[table]/[id] HTTP/1.1
```
Updates all attributes of an item.

**Example Request:**
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

**Success Response:** `200 OK`
```json
{
    "changes": 1
}
```

#### Partial Update
```http
PATCH /[table]/[id] HTTP/1.1
```
Updates specific attributes of an item.

**Example Request:**
```http
PATCH /Orders/1 HTTP/1.1
Content-Type: application/json

{
    "revenue": 25.99
}
```

**Success Response:** `200 OK`
```json
{
    "changes": 1
}
```

#### Delete Item
```http
DELETE /[table]/[id] HTTP/1.1
```
Removes an item from the database.

**Example Request:**
```http
DELETE /Ingredients/1 HTTP/1.1
```

**Success Response:** `200 OK`
```json
{
    "changes": 1
}
```

### Search Endpoint

#### Search Items
```http
GET /[table]/search HTTP/1.1
```
Searches items using custom criteria.

**Example Request:**
```http
GET /Proteins/search?column=protein&condition=LIKE&value=chicken HTTP/1.1
```

**Success Response:** `200 OK`
```json
[
    { "id": 1, "protein": "Grilled Chicken" },
    { "id": 2, "protein": "Chicken Teriyaki" }
]
```

**Error Response:** `400 Bad Request`
```json
{
    "errors": [
        {"msg": "Column is required"},
        {"msg": "Condition is required"},
        {"msg": "Value is required"}
    ]
}
```