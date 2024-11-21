import { Request, Response, NextFunction } from "express";
import checkIdParam from "../../app/middleware/check-id-param.middleware";
import createError from "http-errors";

describe('Check id param middleware', () => {
    it("creates a HttoError 404 when id is not a number", () => {
        const req = {
            params: {
                id: 'not-a-number',
            }
        } as unknown as Request;
        const res = {} as Response
        const next = jest.fn();

        checkIdParam(req, res, next);
        expect(next).toHaveBeenCalledWith(createError.NotFound());
    });

    it("does nothing if id is a valid number", () => {
        const req = {
            params: {
                id: 1,
            }
        } as unknown as Request
        const res = {} as Response
        const next = jest.fn();

        checkIdParam(req, res, next);
        expect(next).toHaveBeenCalledWith();
    });
});