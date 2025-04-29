# Project Poke Bowl Ordering System

## Team "MaxWAstappen"
- s336362 MARC'ANTONIO LOPEZ

## Project Overview
This project is a complete ordering system for a poke bowl restaurant, featuring both:
1. A backend REST API (Express.js + SQLite3)
2. A modern frontend interface (React + Bootstrap)

![Poke Bowl](https://images.unsplash.com/photo-1604259597308-5321e8e4689c?q=80&w=2000)

## Project Structure
```
├── README.md             # Project documentation
├── package.json          # Main project dependencies
├── my-app/               # React frontend
└── without_react/        # Express.js backend
```

## Backend Implementation

### Technologies Used
- Node.js with Express
- SQLite3 for database
- Express Validator for input validation

### Database Schema

#### Core Tables

##### Ingredients
| Column     | Type    | Constraints          |
|------------|---------|----------------------|
| id         | INTEGER | PRIMARY KEY AUTOINCREMENT |
| ingredient | TEXT    | NOT NULL             |

##### Proteins
| Column   | Type    | Constraints          |
|----------|---------|----------------------|
| id       | INTEGER | PRIMARY KEY AUTOINCREMENT |
| protein  | TEXT    | NOT NULL             |

##### Bases
| Column   | Type    | Constraints          |
|----------|---------|----------------------|
| id       | INTEGER | PRIMARY KEY AUTOINCREMENT |
| base     | TEXT    | NOT NULL             |

##### Sizes
| Column   | Type    | Constraints          |
|----------|---------|----------------------|
| id       | INTEGER | PRIMARY KEY AUTOINCREMENT |
| size     | TEXT    | NOT NULL             |

#### Business Logic Tables

##### Dailylimits
| Column               | Type    | Constraints                      |
|----------------------|---------|----------------------------------|
| id                   | INTEGER | PRIMARY KEY AUTOINCREMENT        |
| maxregularbowls      | INTEGER | NOT NULL                         |
| maxmediumbowls       | INTEGER | NOT NULL                         |
| maxlargebowls        | INTEGER | NOT NULL                         |
| currentregularbowls  | INTEGER | CHECK (currentregularbowls <= maxregularbowls) |
| currentmediumbowls   | INTEGER | CHECK (currentmediumbowls <= maxmediumbowls) |
| currentlargebowls    | INTEGER | CHECK (currentlargebowls <= maxlargebowls) |

##### Bowls
| Column   | Type    | Constraints          |
|----------|---------|----------------------|
| id       | INTEGER | PRIMARY KEY AUTOINCREMENT |
| base_id  | INTEGER | FOREIGN KEY REFERENCES Bases(id) |
| size_id  | INTEGER | FOREIGN KEY REFERENCES Sizes(id) |
| amount   | INTEGER | NOT NULL             |

##### BowlProteins
| Column      | Type    | Constraints          |
|-------------|---------|----------------------|
| bowl_id     | INTEGER | FOREIGN KEY REFERENCES Bowls(id) |
| protein_id  | INTEGER | FOREIGN KEY REFERENCES Proteins(id) |
| PRIMARY KEY | (bowl_id, protein_id) |

##### BowlIngredients
| Column        | Type    | Constraints          |
|---------------|---------|----------------------|
| bowl_id       | INTEGER | FOREIGN KEY REFERENCES Bowls(id) |
| ingredient_id | INTEGER | FOREIGN KEY REFERENCES Ingredients(id) |
| PRIMARY KEY   | (bowl_id, ingredient_id) |

##### Orders
| Column   | Type     | Constraints          |
|----------|----------|----------------------|
| id       | INTEGER  | PRIMARY KEY AUTOINCREMENT |
| revenue  | FLOAT    | NOT NULL             |
| date     | DATE     | NOT NULL             |

##### OrderBowls
| Column      | Type    | Constraints          |
|-------------|---------|----------------------|
| order_id    | INTEGER | FOREIGN KEY REFERENCES Orders(id) |
| bowl_id     | INTEGER | FOREIGN KEY REFERENCES Bowls(id) |
| PRIMARY KEY | (order_id, bowl_id) |

### REST API Endpoints

#### Collection Endpoints

##### List All Items
```http
GET /[table] HTTP/1.1
```
Returns all items from the specified table.

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

##### Create Item
```http
POST /[table] HTTP/1.1
```
Creates a new item in the specified table.

**Example Request:**
```http
POST /Orders HTTP/1.1
Content-Type: application/json

{
    "date": "2025-04-29T10:30:00.000Z",
    "revenue": 15.99
}
```

**Success Response:** `201 Created`
```json
{
    "id": 1
}
```

#### Element Endpoints

##### Get Single Item
```http
GET /[table]/[id] HTTP/1.1
```
Retrieves a specific item by ID.

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

##### Update Item
```http
PUT /[table]/[id] HTTP/1.1
```
Updates all attributes of an item.

##### Partial Update
```http
PATCH /[table]/[id] HTTP/1.1
```
Updates specific attributes of an item.

##### Delete Item
```http
DELETE /[table]/[id] HTTP/1.1
```
Removes an item from the database.

#### Search Endpoint

##### Search Items
```http
GET /[table]/search HTTP/1.1
```
Searches items using custom criteria.

**Example Request:**
```http
GET /Proteins/search?column=protein&condition=LIKE&value=chicken HTTP/1.1
```

## Frontend Implementation

### Technologies Used
- React 19
- Bootstrap 5.3
- Vite 6.2

### Features
- Modern, responsive UI
- Interactive poke bowl builder
- Multi-step ordering process
- Quantity selection
- Order summary with pricing

### Components
- **Navigation**: Top navigation bar
- **Hero**: Landing banner with welcome message
- **BowlSizeSelector**: Size selection (Regular, Medium, Large)
- **Bases**: Selection of rice or salad base options
- **Proteins**: Multiple protein options (Tuna, Salmon, Chicken, Tofu)
- **Ingredients**: Various categories of toppings and dressings
- **OrderForm**: Final order review and submission
- **Footer**: Contact information and links

### Building and Running

#### Frontend
```bash
cd my-app
npm install
npm run dev
```

## Getting Started

1. Clone the repository
2. Install dependencies in both project folders:
   ```bash
   npm install
   cd my-app && npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```
4. In a new terminal, start the frontend:
   ```bash
   cd my-app && npm run dev
   ```
5. Access the application at http://localhost:5173