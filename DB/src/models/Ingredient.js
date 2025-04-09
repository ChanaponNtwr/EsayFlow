const { client } = require('../configs/database.config');


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Ingredient(
        Ingredient_ID VARCHAR(255) PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        Value INT,
        Unit VARCHAR NOT NULL
        image_url TEXT
        );
        `;


const createTable = async () => {
    try {
            await client.query(createTableQuery);
            console.log('Table user created successfully');
        } catch (err) {
            console.error('Error creating table:', err);
        }
};

createTable();