# Group "MaxWAstappen"

## Members
- s336362 MARC'ANTONIO LOPEZ
- s123456 GABRIELE TROVATO

# Exercise "NAME OF EXERCISE"

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
- **currentregularbowls**: INTEGER CHECK (currentregularbowls <= maxregularbowls)
- **currentmediumbowls**: INTEGER CHECK (currentmediumbowls <= maxmediumbowls)
- **currentlargebowls**: INTEGER CHECK (currentlargebowls <= maxlargebowls)

### Bowls
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **base_id**: INTEGER
- **protein_id**: INTEGER
- **ingredient_id**: INTEGER
- **size_id**: INTEGER
- **amount**: INTEGER
- **UNIQUE (id, base_id, protein_id, ingredient_id, size_id)**

### Orders
- **id**: INTEGER PRIMARY KEY AUTOINCREMENT
- **bowl_id**: INTEGER

---