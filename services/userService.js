import { userRepository } from "../repositories/userRepository.js";

class UserService {
  getAllUsers() {
    return userRepository.getAll();
  }

  getUser(id) {
    const user = userRepository.getOne({ id });
    if (!user) {
      throw { status: 404, message: 'User not found' };
    }
    return user;
  }

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  createUser(userData) {
    // Check if email is already in use (case insensitive)
    const existingUserByEmail = this.search({ 
      email: userData.email.toLowerCase() 
    });
    if (existingUserByEmail) {
      throw { message: 'User with this email already exists' };
    }

    // Check if phone is already in use
    const existingUserByPhone = this.search({ phone: userData.phone });
    if (existingUserByPhone) {
      throw { message: 'User with this phone already exists' };
    }

    // Create user
    return userRepository.create(userData);
  }

  updateUser(id, userUpdateData) {
    // Check if user exists
    const user = this.getUser(id);
    
    // If email is changing, check if it's available
    if (userUpdateData.email && userUpdateData.email.toLowerCase() !== user.email.toLowerCase()) {
      const existingUserByEmail = this.search({ 
        email: userUpdateData.email.toLowerCase() 
      });
      if (existingUserByEmail) {
        throw { message: 'User with this email already exists' };
      }
    }

    // If phone is changing, check if it's available
    if (userUpdateData.phone && userUpdateData.phone !== user.phone) {
      const existingUserByPhone = this.search({ phone: userUpdateData.phone });
      if (existingUserByPhone) {
        throw { message: 'User with this phone already exists' };
      }
    }

    // Update user
    return userRepository.update(id, userUpdateData);
  }

  deleteUser(id) {
    // Check if user exists
    this.getUser(id);
    return userRepository.delete(id);
  }
}

const userService = new UserService();

export { userService };
