const { client } = require('../configs/database.config');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Users (
        User_ID VARCHAR(255) PRIMARY KEY,
        Myingredient_ID VARCHAR(255),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        Fullname VARCHAR(100) NOT NULL,
        FOREIGN KEY (Myingredient_ID) REFERENCES Myingredient(Myingredient_ID)
    );
`;

const createTable = async () => {
    try {
        await client.query(createTableQuery);
        console.log('Table "Users" created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

createTable();
