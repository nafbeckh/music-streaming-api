import { prismaClient } from '../src/application/database.js'
import bcrypt from 'bcrypt'

export const removeUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: 'test'
    }
  })
}

export const createUser = async () => {
  await prismaClient.user.create({
    data: {
      id: 'user-Wi_srQ8fhSYM',
      username: 'test',
      password: await bcrypt.hash('secretPassword', 10),
      name: 'test',
      country: 'test'
    }
  })
}
