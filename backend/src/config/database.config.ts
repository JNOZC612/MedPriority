import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
    connectionLimit: 10,
});

const promisePool = pool.promise();

const connectToDatabase = async () => {
    try {
        await promisePool.query('SELECT 1');
        console.log('Conexión realizada con éxito!');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
};
export { connectToDatabase, pool };