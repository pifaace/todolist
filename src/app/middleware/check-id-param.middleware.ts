import { NextFunction, Request, Response } from "express";
import createError from "http-errors";

const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id: number = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    next(createError.NotFound())
    return;
  }

  next();
}

export default checkIdParam;