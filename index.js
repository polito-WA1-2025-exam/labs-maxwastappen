import express from 'express';
import sqlite3 from 'sqlite3';
import { body, param, query, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

// Open the SQLite database.
const db = new sqlite3.Database('pokedb', (err) => {
    if (err) console.error(err.message);
});

// List of tables that can be queried.
const allowedTables = [
    'Ingredients',
    'Proteins',
    'Bases',
    'Sizes',
    'Dailylimits',
    'Bowls',
    'Orders'
];

/**
 * Validates if the table name is allowed.
 * @param {string} table - The table name to validate.
 * @returns {boolean} True if valid, false otherwise.
 */
function isValidTable(table) {
    return allowedTables.includes(table);
}

/**
 * Middleware to validate ID as an integer.
 */
const validateId = param('id').isInt().withMessage('ID must be an integer');

/**
 * Middleware to validate date format.
 */
const validateDate = body('date').optional().isISO8601().withMessage('Date must be in ISO 8601 format');

/**
 * Retrieve all rows from a given table.
 */
app.get('/:table', (req, res) => {
    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    const query = `SELECT * FROM ${table}`;
    db.all(query, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

/**
 * Search rows from the specified table with custom criteria.
 */
app.get('/:table/search', [
    query('column').notEmpty().withMessage('Column is required'),
    query('condition').notEmpty().withMessage('Condition is required'),
    query('value').notEmpty().withMessage('Value is required')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    const { column, condition, value } = req.query;
    const query = `SELECT * FROM ${table} WHERE ${column} ${condition} ?`;
    db.all(query, [value], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

/**
 * Retrieve a specific row by ID from the given table.
 */
app.get('/:table/:id', validateId, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    const query = `SELECT * FROM ${table} WHERE id = ?`;
    db.get(query, [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(row);
    });
});

/**
 * Create a new row in the specified table.
 * Expects the request body to contain the column values.
 */
app.post('/:table', validateDate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    // Exclude any provided id.
    const keys = Object.keys(req.body).filter((k) => k !== 'id');
    const columns = keys.join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const values = keys.map((k) => req.body[k]);
    // Assign to user with id=1
    columns += ', user_id';
    placeholders += ', ?';
    values.push(1);
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    db.run(query, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID });
    });
});

/**
 * Update an existing row in the specified table by replacing all attributes.
 */
app.put('/:table/:id', [validateId, validateDate], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    const keys = Object.keys(req.body);
    const assignments = keys.map((key) => `${key} = ?`).join(', ');
    const values = keys.map((key) => req.body[key]);
    values.push(req.params.id);
    const query = `UPDATE ${table} SET ${assignments} WHERE id = ?`;
    db.run(query, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

/**
 * Update specific attributes for a row in the specified table.
 */
app.patch('/:table/:id', [validateId, validateDate], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    const keys = Object.keys(req.body);
    const assignments = keys.map((key) => `${key} = ?`).join(', ');
    const values = keys.map((key) => req.body[key]);
    values.push(req.params.id);
    const query = `UPDATE ${table} SET ${assignments} WHERE id = ?`;
    db.run(query, values, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

/**
 * Delete a row in the specified table by ID.
 */
app.delete('/:table/:id', validateId, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const table = req.params.table;
    if (!isValidTable(table)) {
        return res.status(400).json({ error: 'Invalid table name' });
    }
    const query = `DELETE FROM ${table} WHERE id = ?`;
    db.run(query, [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ changes: this.changes });
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
