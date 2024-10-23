import { Router } from "express";
import { getCamillaId, getLastMovement, insertMovement } from "../config/database.config";
import MovimientoPaciente from "../models/MovimientoPaciente";
import { Console } from "console";

const router = Router();
router.post("/mover", async (req, res) => {
    try {
        const { id_paciente, id_area, numero, hora_entrada, hora_salida } = req.body;
        const idCam: any = await getCamillaId(Number(id_area), Number(numero));
        const movimiento: MovimientoPaciente = {
            idPaciente: Number(id_paciente),
            idArea: Number(id_area),
            idCamilla: idCam[0].id_camilla,
            horaEntrada: hora_entrada,
            horaSalida: hora_salida
        }
        console.log("MOVIMIENTO");
        const result = await insertMovement(movimiento);
    } catch (error) {
        res.status(500).json({ message: "Error al conectar" });
    }
});
router.get("/last", async (req, res) => {
    const { id_paciente } = req.query;
    try {
        const result = await getLastMovement((Number)(id_paciente));
        res.json(result);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error.message })
    }
});
export default router;