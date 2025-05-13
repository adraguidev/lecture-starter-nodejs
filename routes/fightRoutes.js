import { Router } from "express";
import { fightService } from "../services/fightService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// GET /api/fights - get all fights (history)
router.get('/', (req, res, next) => {
  try {
    res.data = fightService.getAllFights();
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// GET /api/fights/:id - get a specific fight by id
router.get('/:id', (req, res, next) => {
  try {
    const fightId = req.params.id;
    res.data = fightService.getFight(fightId);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

// POST /api/fights - start a new fight
router.post('/', (req, res, next) => {
  try {
    const { fighter1, fighter2 } = req.body;
    
    if (!fighter1 || !fighter2) {
      res.err = { message: 'Both fighter1 and fighter2 IDs are required' };
      return next();
    }
    
    res.data = fightService.startFight(fighter1, fighter2);
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
