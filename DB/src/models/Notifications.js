const { client } = require('../configs/database.config');


const createTableQuery = `
    CREATE TABLE IF NOT EXISTS Notification(
        Notification_ID VARCHAR(255) PRIMARY KEY,
        Users_ID VARCHAR(255) ,
        Ingredient_ID VARCHAR(255),
        NotificationType VARCHAR(100) UNIQUE NOT NULL,
        Time DATE,
        Is_Read BOOL,
        Message VARCHAR(100) NOT NULL,
        FOREIGN KEY (Users_ID) REFERENCES Member(Member_ID),
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