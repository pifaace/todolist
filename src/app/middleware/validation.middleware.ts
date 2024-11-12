import { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';
import ValidatorException from '../exception/validator.exception';

const validateData = (schema: z.ZodObject<any, any>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				next(new ValidatorException(error.errors))
				return;
			} else {
				next(new Error())
			}
		}
	}
}

export default validateData;