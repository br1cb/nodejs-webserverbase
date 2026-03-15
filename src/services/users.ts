import userRepository from '../repositories/user.repository.js';
import type { User } from '../models/user.model.js';

export async function allUsers(): Promise<User[]> {
  return await userRepository.getAll();
}

export async function getUserById(id: number): Promise<User | null> {
  return await userRepository.getById(id);
}

export async function createUser(user: Omit<User, 'id'>): Promise<number> {
  return await userRepository.create(user);
}

export async function updateUser(id: number, data: Partial<Omit<User, 'id'>>): Promise<boolean> {
  return await userRepository.update(id, data);
}

export async function deleteUser(id: number): Promise<boolean> {
  return await userRepository.delete(id);
}
