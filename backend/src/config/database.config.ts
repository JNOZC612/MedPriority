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
        const SQL = 'INSERT INTO movimiento_paciente (id_paciente, id_area, id_camilla, hora_entrada, hora_salida) VALUES (?, ?, ?, ?, ?)'
        const [result] = await promisePool.query(SQL, [movimiento.idPaciente, movimiento.idArea, movimiento.idCamilla, movimiento.horaEntrada, movimiento.horaSalida]);
        return (result as any).insertId;
    } catch (error) {
        console.error('Error al insertar movimiento: ', error);
        throw error;
    }
}
const searchPatient = async (id: number, name: string) => {
    try {
        let SQL = '';
        let params = [];
        // Si se proporciona un ID, se busca por ID
        if (id) {
            SQL = "SELECT * FROM paciente WHERE id_paciente = ?";
            params = [id];
        }
        // Si no se proporciona un ID pero hay un nombre, se busca por nombre
        else if (name) {
            SQL = "SELECT * FROM paciente WHERE nombre LIKE ?";
            params = [`%${name}%`]; // Búsqueda parcial por nombre
        } else {
            throw new Error("Debe proporcionar un id o un nombre para la búsqueda");
        }
        // Se define que `rows` es un arreglo de cualquier tipo
        const [rows]: any[] = await promisePool.query(SQL, params);
        // Validar si se encontraron resultados
        if (rows.length === 0) {
            throw new Error("Paciente no encontrado");
        }
        return rows;
    } catch (error) {
        console.error('Error al buscar paciente: ', error);
        throw error;
    }
}
const getCamillaId = async (idArea: Number, numero: Number) => {
    try {
        const SQL = 'SELECT id_camilla FROM camilla where id_area = ? and numero = ?';
        const [result] = await promisePool.query(SQL, [idArea, numero])
        return result;
    } catch (error) {
        console.error('Error al obtener id de camilla: ', error);
        throw error;
    }
}
const getLastMovement = async (id_paciente: Number) => {
    try {
        const SQL = 'SELECT id_movimiento, id_area, id_camilla FROM movimiento_paciente WHERE id_paciente = ? order by id_movimiento desc limit 1';
        const [result] = await promisePool.query(SQL, [id_paciente]);
        console.log("RESULT: " + result)
        return result;
    } catch (error) {
        console.error('Error al obtener ultimo movimiento', error)
        throw error;
    }
}
export { getLastMovement, connectToDatabase, pool, getCamillaId, getDoctors, insertPatient, insertMovement, getAreas, getCamillasArea, searchPatient };