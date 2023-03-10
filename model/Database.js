// Load modules
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect with SQLite database
const db_path = path.join(__dirname, '../database', 'database.db');
const appDatabase = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, err => {
    if(err){
        console.error(err);
    }
    else{
        console.log("Successfully connected to database");
    }
})

// Export database object
exports.default = appDatabase;
