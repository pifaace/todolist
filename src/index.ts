import express, { NextFunction } from 'express';
import routes from './app/routes';
import createError, { HttpError } from 'http-errors';
import ValidatorException from './app/exception/validator.exception';
import helmet from 'helmet';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});

app.use((err: Error | HttpError, req: express.Request, res: express.Response, next: NextFunction) => {
  if (createError.isHttpError(err)) {
    res.status(err.statusCode).json({
      code: err.statusCode,
      message: err.message,
    });
  } else if (err instanceof ValidatorException) {
    res.status(422).json({
      code: 422,
      errors: err.errors,
    });
  } else {
    res.status(500).json({
      code: 500,
      message: 'Internal server error',
    });
  }
})