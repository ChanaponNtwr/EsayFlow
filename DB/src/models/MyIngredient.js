const { client } = require('../configs/database.config');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS MyIngredient (
        Myingredient_ID VARCHAR(255) PRIMARY KEY,
        Ingredient_ID VARCHAR(255),
        Quantity FLOAT,
        Expiration_date DATE,
        Likes BOOLEAN,
        Allergy_Info BOOLEAN,
        FOREIGN KEY (Ingredient_ID) REFERENCES Ingredient(Ingredient_ID) 
    );
`;

const createTable = async () => {
    try {
        await client.query(createTableQuery);
        console.log('Table "MyIngredient" created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

createTable();
