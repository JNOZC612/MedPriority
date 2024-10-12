import mysql from "mysql2";

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'hospitaldb',
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
const getDoctors = async () => {
    try {
        const [rows] = await promisePool.query(' SELECT * FROM doctor ORDER BY id_doctor');
        return rows;
    } catch (error) {
        console.error('Error al obtener doctores: ', error);
        throw error;
    }
};
export { connectToDatabase, pool, getDoctors };