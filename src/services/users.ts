import userRepository from '../repositories/user.repository.js';

// TODO: terminar..
async function allUsers() {
  return await userRepository.getAll();
}

export { allUsers };