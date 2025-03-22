-- Core Tables
CREATE TABLE Ingredients (
id INTEGER PRIMARY KEY AUTOINCREMENT,
ingredient TEXT NOT NULL
);

CREATE TABLE Proteins (
id INTEGER PRIMARY KEY AUTOINCREMENT,
protein TEXT NOT NULL
);

CREATE TABLE Bases (
id INTEGER PRIMARY KEY AUTOINCREMENT,
base TEXT NOT NULL
);

CREATE TABLE Sizes (
id INTEGER PRIMARY KEY AUTOINCREMENT,
size TEXT NOT NULL
);

-- Business Logic Tables
CREATE TABLE Dailylimits (
id INTEGER PRIMARY KEY AUTOINCREMENT,
maxregularbowls INTEGER NOT NULL,
maxmediumbowls INTEGER NOT NULL,
maxlargebowls INTEGER NOT NULL,
currentregularbowls INTEGER DEFAULT 0 CHECK (currentregularbowls <= maxregularbowls),
currentmediumbowls INTEGER DEFAULT 0 CHECK (currentmediumbowls <= maxmediumbowls),
currentlargebowls INTEGER DEFAULT 0 CHECK (currentlargebowls <= maxlargebowls)
);

CREATE TABLE Bowls (
id INTEGER PRIMARY KEY AUTOINCREMENT,
base_id INTEGER,
size_id INTEGER,
amount INTEGER NOT NULL,
FOREIGN KEY (base_id) REFERENCES Bases(id),
FOREIGN KEY (size_id) REFERENCES Sizes(id)
);

CREATE TABLE BowlProteins (
bowl_id INTEGER,
protein_id INTEGER,
PRIMARY KEY (bowl_id, protein_id),
FOREIGN KEY (bowl_id) REFERENCES Bowls(id),
FOREIGN KEY (protein_id) REFERENCES Proteins(id)
);

CREATE TABLE BowlIngredients (
bowl_id INTEGER,
ingredient_id INTEGER,
PRIMARY KEY (bowl_id, ingredient_id),
FOREIGN KEY (bowl_id) REFERENCES Bowls(id),
FOREIGN KEY (ingredient_id) REFERENCES Ingredients(id)
);

CREATE TABLE Orders (
id INTEGER PRIMARY KEY AUTOINCREMENT,
revenue FLOAT NOT NULL,
date DATE NOT NULL
);

CREATE TABLE OrderBowls (
order_id INTEGER,
bowl_id INTEGER,
PRIMARY KEY (order_id, bowl_id),
FOREIGN KEY (order_id) REFERENCES Orders(id),
FOREIGN KEY (bowl_id) REFERENCES Bowls(id)
);

-- Sample Data
INSERT INTO Sizes (size) VALUES
('Regular'),
('Medium'),
('Large');

INSERT INTO Bases (base) VALUES
('White Rice'),
('Brown Rice'),
('Mixed Greens');

INSERT INTO Proteins (protein) VALUES
('Grilled Chicken'),
('Salmon'),
('Tuna'),
('Tofu');

INSERT INTO Ingredients (ingredient) VALUES
('Avocado'),
('Mango'),
('Edamame'),
('Cucumber'),
('Carrots'),
('Sesame Seeds');

INSERT INTO Dailylimits (maxregularbowls, maxmediumbowls, maxlargebowls) VALUES
(50, 30, 20);

-- Sample Bowl with ingredients and proteins
INSERT INTO Bowls (base_id, size_id, amount) VALUES
(1, 1, 1);  -- Regular bowl with white rice

INSERT INTO BowlProteins (bowl_id, protein_id) VALUES
(1, 1),  -- Add chicken
(1, 2);  -- Add salmon

INSERT INTO BowlIngredients (bowl_id, ingredient_id) VALUES
(1, 1),  -- Add avocado
(1, 4),  -- Add cucumber
(1, 6);  -- Add sesame seeds

-- Sample Order
INSERT INTO Orders (revenue, date) VALUES
(15.99, '2024-03-22');

INSERT INTO OrderBowls (order_id, bowl_id) VALUES
(1, 1);