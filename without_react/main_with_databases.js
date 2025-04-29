// File: Labs/labs-maxwastappen/main_with_databases.js

// Import the sqlite3 module for interacting with SQLite databases.
import sqlite3 from 'sqlite3';

/**
 * Retrieves all rows from a specified table in the database.
 *
 * Constructs a SQL query to select all rows from the provided table.
 * Executes the query using the provided database instance and wraps the
 * result set in a Promise.
 *
 * @param {string} table - The name of the table to retrieve data from.
 * @param {sqlite3.Database} db - The database instance to run queries.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of rows.
 */
function retrieveAllFrom(table, db) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table}`;
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

/**
 * Retrieves rows from a specified table where a condition is met.
 *
 * Constructs a SQL query with the given column, condition operator, and value.
 * Safely binds the value to the query to prevent SQL injection.
 * Executes the query using the provided database instance and returns the matching
 * rows in a Promise.
 *
 * @param {string} table - The table name from which to retrieve data.
 * @param {string} column - The column to filter by.
 * @param {string} condition - The condition operator (e.g., '=', '>', '<').
 * @param {*} value - The value to compare against the column.
 * @param {sqlite3.Database} db - The database instance to run queries.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of rows matching the condition.
 */
function retrieveFromWhere(table, column, condition, value, db) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${table} WHERE ${column} ${condition} ?`;
        db.all(query, [value], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
}

// Create a new database instance and connect to the 'pokedb' database.
// If the connection fails, log the error message to the console.
const db = new sqlite3.Database('pokedb', (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Immediately invoked async function to perform database operations.
// This function retrieves data from the database and logs the results to the console.
(async () => {
    try {
        // Retrieve all rows from the 'Ingredients' table.
        let rows = await retrieveAllFrom('Ingredients', db);
        console.log(rows);

        // Retrieve rows from the 'Proteins' table where the id equals 2.
        rows = await retrieveFromWhere('Proteins', 'id', '=', 2, db);
        console.log(rows);
    } catch (error) {
        console.error('Error during database operations:', error);
    }
})();