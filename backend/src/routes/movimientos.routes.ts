import { Router } from "express";

const router = Router();
router.get("/registrar", (req, res) => {
    try {
       
    } catch (error) {
        res.status(500).json({ message: "Error al conectar" });
    }
});
export default router;