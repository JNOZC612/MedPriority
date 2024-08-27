import { Request, Response, NextFunction } from "express";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(500).send('Algo salió mal! :(');
};
export default errorMiddleware;