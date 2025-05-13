import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// GET /api/fighters - get all fighters
router.get('/', (req, res, next) => {
  try {
    res.data = fighterService.getAllFighters();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// GET /api/fighters/:id - get fighter by id
router.get('/:id', (req, res, next) => {
  try {
    const fighterId = req.params.id;
    res.data = fighterService.getFighter(fighterId);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// POST /api/fighters - create a new fighter
router.post('/', createFighterValid, (req, res, next) => {
  try {
    if (!res.err) {
      res.data = fighterService.createFighter(req.body);
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// PATCH /api/fighters/:id - update a fighter
router.patch('/:id', updateFighterValid, (req, res, next) => {
  try {
    if (!res.err) {
      const fighterId = req.params.id;
      res.data = fighterService.updateFighter(fighterId, req.body);
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// DELETE /api/fighters/:id - delete a fighter
router.delete('/:id', (req, res, next) => {
  try {
    const fighterId = req.params.id;
    res.data = fighterService.deleteFighter(fighterId);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
