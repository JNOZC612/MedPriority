import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
    try {
        res.json({ message: "Conexión Correcta!" });
    } catch (error) {
        res.status(500).json({ message: "Error al conectar" });
    }
});