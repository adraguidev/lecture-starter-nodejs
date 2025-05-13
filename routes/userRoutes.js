import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// GET /api/users - get all users
router.get('/', (req, res, next) => {
  try {
    res.data = userService.getAllUsers();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// GET /api/users/:id - get user by id
router.get('/:id', (req, res, next) => {
  try {
    const userId = req.params.id;
    res.data = userService.getUser(userId);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// POST /api/users - create a new user
router.post('/', createUserValid, (req, res, next) => {
  try {
    if (!res.err) {
      res.data = userService.createUser(req.body);
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// PATCH /api/users/:id - update a user
router.patch('/:id', updateUserValid, (req, res, next) => {
  try {
    if (!res.err) {
      const userId = req.params.id;
      res.data = userService.updateUser(userId, req.body);
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// DELETE /api/users/:id - delete a user
router.delete('/:id', (req, res, next) => {
  try {
    const userId = req.params.id;
    res.data = userService.deleteUser(userId);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
