import { Router, Request, Response } from "express";
import { getAreas } from "../config/database.config";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const areas = await getAreas();
        res.json(areas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener areas" });
    }
});
export default router;