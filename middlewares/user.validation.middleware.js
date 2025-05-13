import { USER } from "../models/user.js";

const isEmailValid = (email) => {
  const emailRegex = /@gmail\.com$/i;
  return emailRegex.test(email);
};

const isPhoneValid = (phone) => {
  const phoneRegex = /^\+380\d{9}$/;
  return phoneRegex.test(phone);
};

const isPasswordValid = (password) => {
  return typeof password === 'string' && password.length >= 4;
};

const createUserValid = (req, res, next) => {
  const userData = req.body;
  const userModelKeys = Object.keys(USER);
  const requiredFields = userModelKeys.filter(key => key !== 'id');
  
  // Check if id is present in request body (should not be)
  if (userData.id) {
    res.err = { message: 'Id should not be present in request body' };
    return next();
  }
  
  // Check for required fields
  const missingFields = requiredFields.filter(field => !userData[field]);
  if (missingFields.length > 0) {
    res.err = { message: `Missing required fields: ${missingFields.join(', ')}` };
    return next();
  }
  
  // Check for extra fields
  const extraFields = Object.keys(userData).filter(field => !userModelKeys.includes(field));
  if (extraFields.length > 0) {
    res.err = { message: `Extra fields not allowed: ${extraFields.join(', ')}` };
    return next();
  }
  
  // Validate email format
  if (!isEmailValid(userData.email)) {
    res.err = { message: 'Email should be from @gmail domain' };
    return next();
  }
  
  // Validate phone format
  if (!isPhoneValid(userData.phone)) {
    res.err = { message: 'Phone should match format: +380xxxxxxxxx' };
    return next();
  }
  
  // Validate password
  if (!isPasswordValid(userData.password)) {
    res.err = { message: 'Password should be at least 4 characters long' };
    return next();
  }
  
  next();
};

const updateUserValid = (req, res, next) => {
  const userData = req.body;
  const userModelKeys = Object.keys(USER);
  
  // Check if id is present in request body (should not be)
  if (userData.id) {
    res.err = { message: 'Id should not be present in request body' };
    return next();
  }
  
  // Check if at least one field is present
  const providedFields = Object.keys(userData);
  if (providedFields.length === 0) {
    res.err = { message: 'At least one field to update must be provided' };
    return next();
  }
  
  // Check for extra fields
  const extraFields = providedFields.filter(field => !userModelKeys.includes(field));
  if (extraFields.length > 0) {
    res.err = { message: `Extra fields not allowed: ${extraFields.join(', ')}` };
    return next();
  }
  
  // Validate email if provided
  if (userData.email && !isEmailValid(userData.email)) {
    res.err = { message: 'Email should be from @gmail domain' };
    return next();
  }
  
  // Validate phone if provided
  if (userData.phone && !isPhoneValid(userData.phone)) {
    res.err = { message: 'Phone should match format: +380xxxxxxxxx' };
    return next();
  }
  
  // Validate password if provided
  if (userData.password && !isPasswordValid(userData.password)) {
    res.err = { message: 'Password should be at least 4 characters long' };
    return next();
  }
  
  next();
};

export { createUserValid, updateUserValid };
