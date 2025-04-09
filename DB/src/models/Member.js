const { client } = require('../configs/database.config');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Member (
        Member_ID VARCHAR(255) PRIMARY KEY,
        User_ID VARCHAR(255),
        FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
    );
`;

const createTable = async () => {
    try {
        await client.query(createTableQuery);
        console.log('Table "Member" created successfully');
    } catch (err) {
        console.error('Error creating table:', err);
    }
};

createTable();
