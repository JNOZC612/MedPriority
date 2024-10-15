import mysql from "mysql2";
import { Paciente } from "../models/Paciente";
import MovimientoPaciente from "../models/MovimientoPaciente";
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
const getCamillasArea = async (id_area: number) => {
    try {
        const [rows] = await promisePool.query("SELECT id_camilla, numero FROM camilla WHERE id_area = ?", [id_area]);
        return rows;
    } catch (error) {
        console.error("Error al obtener camillas según area: ", error);
        throw error;
    }
}
const getAreas = async () => {
    try {
        const [rows] = await promisePool.query('SELECT * FROM area ORDER BY id_area');
        return rows;
    } catch (error) {
        console.error('Error al obtener areas: ', error);
        throw error;
    }
}

const insertPatient = async (paciente: Paciente): Promise<number> => {
    try {
        const SQL = 'INSERT INTO paciente (nombre, fecha_nacimiento, sexo, direccion, telefono, email, seguro) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await promisePool.query(SQL, [paciente.nombre, paciente.fecha_nacimiento, paciente.sexo, paciente.direccion, paciente.telefono, paciente.email, paciente.seguro]);
        return (result as any).insertId;
    } catch (error) {
        console.error('Error al insertar paciente: ', error);
        throw error;
    }
};
const insertMovement = async (movimiento: MovimientoPaciente): Promise<number> => {
    try {
        const SQL = 'INSERT INTO movimiento_paciente (id_paciente, id_area, id_camilla, hora_entrada) VALUES (?, ?, ?, ?)'
        const [result] = await promisePool.query(SQL, [movimiento.idPaciente, movimiento.idArea, movimiento.idCamilla, movimiento.horaEntrada]);
        return (result as any).insertId;
    } catch (error) {
        console.error('Error al insertar movimiento: ', error);
        throw error;
    }
}
export { connectToDatabase, pool, getDoctors, insertPatient, insertMovement, getAreas, getCamillasArea };