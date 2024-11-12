import { ZodIssue } from "zod";

class ValidatorException extends Error {
    errors: ZodIssue[];
    constructor(errors: ZodIssue[]) {
        super()
        this.errors = errors;
    }
}

export default ValidatorException;