const { client } = require('../configs/database.config');


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Menu(
        Menu_ID VARCHAR(255) PRIMARY KEY,
        Menu_Ingredient_ID VARCHAR(255) ,
        FOREIGN KEY (Menu_Ingredient_ID) REFERENCES Menu_Ingredient(Menu_Ingredient_ID)
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