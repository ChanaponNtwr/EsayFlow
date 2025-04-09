const { client } = require('../configs/database.config');


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Menu_Ingredient(
        Menu_Ingredient_ID VARCHAR(255) PRIMARY KEY,
        Ingredient_ID VARCHAR(255),
        Step VARCHAR(255) NOT NULL,
        Discription VARCHAR(255) NOT NULL,
        Ingredient VARCHAR(255) NOT NULL,
        FOREIGN KEY (Ingredient_ID) REFERENCES Ingredient(Ingredient_ID)
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