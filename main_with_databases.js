import sqlite3 from 'sqlite3';

/**
 * Retrieves all rows from a specified table in the database.
 *
 * This function constructs a SQL query to select every row from the given table.
 * It executes the query using the database instance and returns the results in a promise.
 *
 * @param {string} table - The name of the table to retrieve data from.
 * @param {sqlite3.Database} db - The database instance.
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
 * Retrieves rows from a specified table based on a condition.
 *
 * This function constructs a SQL query using the given column, condition, and a value.
 * It safely binds the value to the '?' placeholder to prevent SQL injection.
 * The query is executed using the provided database instance. The function returns
 * the matching rows wrapped in a promise.
 *
 * @param {string} table - The name of the table to retrieve data from.
 * @param {string} column - The column to be used in the WHERE clause.
 * @param {string} condition - The condition operator for the WHERE clause.
 * @param {*} value - The value to compare the column with.
 * @param {sqlite3.Database} db - The database instance.
 * @returns {Promise<Array<Object>>} A promise that resolves with an array of rows meeting the condition.
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

/**
 * Creates a new database instance and connects to the 'pokedb' database.
 *
 * This connection attempt logs an error message to the console if it fails.
 */
const db = new sqlite3.Database('pokedb', (err) => {
    if (err) {
        console.error(err.message);
    }
});

// Immediately invoked async function to perform database operations.
(async () => {
    // Retrieve all rows from the 'Ingredients' table and log the results.
    let rows = await retrieveAllFrom('Ingredients', db);
    console.log(rows);

    // Retrieve rows from the 'Ingredients' table where the ID equals 2 and log the results.
    rows = await retrieveFromWhere('Proteins', 'id', '=', 2, db);
    console.log(rows);
})();