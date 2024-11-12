import { PrismaClient, Todo } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import validateData from "../middleware/validation.middleware";
import { todoCreateSchema, todoUpdateSchema } from "../schema/todo.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import createError from "http-errors";
import checkIdParam from "../middleware/check-id-param.middleware";
 
const prisma = new PrismaClient;

const router = Router();

router.get('/todos', async (req: Request, res: Response<Todo[]>) => {
  const todos = await prisma.todo.findMany();

  res.send(todos);
})

router.get('/todos/:id', checkIdParam, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todo = await prisma.todo.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id)
      },
    })

    res.json(todo);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      next(createError.NotFound());
    } else {
      next(createError.InternalServerError())
    }
  }
})

router.post('/todos', validateData(todoCreateSchema), async (req: Request, res: Response<Todo>) => {
  const todo = await prisma.todo.create({
    data: req.body,
  });

  res.status(201).json(todo);
});

router.patch(
  '/todos/:id', 
  checkIdParam, 
  validateData(todoUpdateSchema), 
  async (req: Request, res: Response<Todo|any>, 
  next: NextFunction,
) => {
  try {
    const updateTodo = await prisma.todo.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });

    res.json(updateTodo);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      next(createError.NotFound());
    } else {
      next(createError.InternalServerError());
    }
  }
});

router.delete('/todos/:id', checkIdParam, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.todo.findUniqueOrThrow({
      where: {
        id: parseInt(req.params.id),
      }
    });

    await prisma.todo.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      next(createError.NotFound());
    } else {
      next(createError.InternalServerError())
    }

    return;
  }

  res.status(204).send();
});

export default router;