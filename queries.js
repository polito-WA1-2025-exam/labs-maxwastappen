import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('pokedb', (err) => {
    if (err) throw err;
});

const sql = `SELECT * FROM Orders`;

db.all(sql, [], (err, rows) => {
    if (err) throw err;
    rows.forEach((row) => {
        console.log(row);
    });
});