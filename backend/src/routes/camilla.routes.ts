import { Router, Request, Response } from "express";
import { getCamillasArea } from "../config/database.config";
const router = Router();
router.get("/area", async (req: Request, res: Response) => {
    try {
        const { id_area } = req.body;
        if (!id_area) {
            return res.status(400).json({ message: "El Id del area es necesario" })
        }
        const camillas = await getCamillasArea(id_area);
        res.status(200).json(camillas)
    } catch (error) {
        console.error("Error al obtener camillas según area: ", error);
        res.status(500).json({ message: "Error al obtener camillas" });
    }
});

export default router;