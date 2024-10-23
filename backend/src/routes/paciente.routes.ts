import { Router, Request, Response } from "express";
import { getCamillaId, insertMovement, insertPatient, searchPatient } from "../config/database.config";
import { Paciente } from "../models/Paciente";
import MovimientoPaciente from "../models/MovimientoPaciente";
const router = Router();

router.post("/registrar", async (req: Request, res: Response) => {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const {
            nombre,
            fecha_nacimiento,
            sexo,
            direccion,
            telefono,
            email,
            seguro,
            area,
            camilla,
            hora_entrada
        } = req.body;

        // Validar que se envíen los campos obligatorios
        if (!nombre || !fecha_nacimiento || !sexo) {
            return res.status(400).json({ message: "Faltan campos obligatorios." });
        }

        // Crear un nuevo objeto Paciente con los datos recibidos
        const paciente: Paciente = {
            nombre,
            fecha_nacimiento,
            sexo,
            direccion,
            telefono,
            email,
            seguro
        };
        const idcam:any = await getCamillaId(area, camilla);
        // Insertar el paciente en la base de datos usando la función insertPatient
        const pacienteId = await insertPatient(paciente);
        const movimiento: MovimientoPaciente = {
            idPaciente: pacienteId,
            idArea: area,
            idCamilla: idcam[0].id_camilla,
            horaEntrada: hora_entrada,
        };
        const movimientoId = await insertMovement(movimiento);
        // Responder con éxito y el ID del paciente recién creado
        res.status(201).json({
            message: "Paciente registrado con éxito",
            pacienteId
        });
    } catch (error) {
        console.error("Error al registrar paciente: ", error);
        res.status(500).json({ message: "Error al registrar paciente", error });
    }
});
router.get('/buscar', async (req, res) => {
    const { id, nombre } = req.query;
    try {
        // Convierte id en número y nombre en cadena, o pásalos como undefined si no existen
        const result = await searchPatient(Number(id), nombre ? String(nombre) : '');
        // Enviar los resultados al cliente
        res.json(result);
    } catch (error: any) {
        // Manejo de errores y envío de mensajes
        res.status(500).json({ message: error.message });
    }
});

export default router;
