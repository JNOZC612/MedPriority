import { Router } from "express";
import { getDoctors } from "../config/database.config";

const router = Router();

router.get("/", async (req, res) => {
    try {
        const doctors = await getDoctors();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener doctores" });
    }
});

export default router;