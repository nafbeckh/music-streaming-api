import { validate } from '../validation/validation.js'
import {
  registerUserSchema
} from '../validation/user-schema.js'
import { prismaClient } from '../application/database.js'
import { ResponseError } from '../errors/response-error.js'
import { nanoid } from 'nanoid'
import bcrypt from 'bcrypt'

const register = async (payload) => {
  validate(registerUserSchema, payload)

  const countUser = await prismaClient.user.count({
    where: {
      username: payload.username
    }
  })

  if (countUser === 1) {
    throw new ResponseError(400, 'Username already exists')
  }

  payload.id = `payload-${nanoid(12)}`
  payload.password = await bcrypt.hash(payload.password, 10)

  return prismaClient.user.create({
    data: payload,
    select: {
      id: true,
      username: true,
      name: true,
      country: true,
      created_at: true
    }
  })
}

export default {
  register
}
