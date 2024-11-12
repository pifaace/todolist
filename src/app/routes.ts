import { Router } from 'express';
import todoController from './controller/todo.controller';

const router = Router()
  .use(todoController)

export default router;
