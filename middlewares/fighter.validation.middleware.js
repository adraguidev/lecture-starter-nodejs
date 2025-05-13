import { FIGHTER } from "../models/fighter.js";

const isPowerValid = (power) => {
  return Number.isInteger(power) && power >= 1 && power <= 100;
};

const isDefenseValid = (defense) => {
  return Number.isInteger(defense) && defense >= 1 && defense <= 10;
};

const isHealthValid = (health) => {
  if (health === undefined) return true; // Health is optional
  return Number.isInteger(health) && health >= 80 && health <= 120;
};

const createFighterValid = (req, res, next) => {
  const fighterData = req.body;
  const fighterModelKeys = Object.keys(FIGHTER);
  const requiredFields = fighterModelKeys.filter(key => key !== 'id' && key !== 'health');
  
  // Check if id is present in request body (should not be)
  if (fighterData.id) {
    res.err = { message: 'Id should not be present in request body' };
    return next();
  }
  
  // Check for required fields
  const missingFields = requiredFields.filter(field => fighterData[field] === undefined);
  if (missingFields.length > 0) {
    res.err = { message: `Missing required fields: ${missingFields.join(', ')}` };
    return next();
  }
  
  // Check for extra fields
  const extraFields = Object.keys(fighterData).filter(field => !fighterModelKeys.includes(field));
  if (extraFields.length > 0) {
    res.err = { message: `Extra fields not allowed: ${extraFields.join(', ')}` };
    return next();
  }
  
  // Validate power
  if (!isPowerValid(fighterData.power)) {
    res.err = { message: 'Power must be a number between 1 and 100' };
    return next();
  }
  
  // Validate defense
  if (!isDefenseValid(fighterData.defense)) {
    res.err = { message: 'Defense must be a number between 1 and 10' };
    return next();
  }
  
  // Validate health if provided
  if (fighterData.health !== undefined && !isHealthValid(fighterData.health)) {
    res.err = { message: 'Health must be a number between 80 and 120' };
    return next();
  }
  
  // Set default health value if not provided
  if (fighterData.health === undefined) {
    fighterData.health = 85;
  }
  
  next();
};

const updateFighterValid = (req, res, next) => {
  const fighterData = req.body;
  const fighterModelKeys = Object.keys(FIGHTER);
  
  // Check if id is present in request body (should not be)
  if (fighterData.id) {
    res.err = { message: 'Id should not be present in request body' };
    return next();
  }
  
  // Check if at least one field is present
  const providedFields = Object.keys(fighterData);
  if (providedFields.length === 0) {
    res.err = { message: 'At least one field to update must be provided' };
    return next();
  }
  
  // Check for extra fields
  const extraFields = providedFields.filter(field => !fighterModelKeys.includes(field));
  if (extraFields.length > 0) {
    res.err = { message: `Extra fields not allowed: ${extraFields.join(', ')}` };
    return next();
  }
  
  // Validate power if provided
  if (fighterData.power !== undefined && !isPowerValid(fighterData.power)) {
    res.err = { message: 'Power must be a number between 1 and 100' };
    return next();
  }
  
  // Validate defense if provided
  if (fighterData.defense !== undefined && !isDefenseValid(fighterData.defense)) {
    res.err = { message: 'Defense must be a number between 1 and 10' };
    return next();
  }
  
  // Validate health if provided
  if (fighterData.health !== undefined && !isHealthValid(fighterData.health)) {
    res.err = { message: 'Health must be a number between 80 and 120' };
    return next();
  }
  
  next();
};

export { createFighterValid, updateFighterValid };
