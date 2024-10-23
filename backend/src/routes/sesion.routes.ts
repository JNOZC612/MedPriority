import { Router } from "express";
const router = Router();
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`M: ${email} P: ${password}`)
    if (!email || !password) {
        console.log("RES 400");
        res.status(400).json({ message: "mail y pass son obligatorios" });
    }
    if (email === "admin" && password === "admin") {
        console.log("RES 200");
        res.status(200).json({ message: "credenciales validas" });
    } else {
        console.log("RES 401");
        res.status(401).json({ message: "credenciales no validas" });
    }
});
export default router;