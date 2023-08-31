import { ResponseError } from '../../errors/response-error.js'
import { registerUserSchema } from './schema.js'

const validate = (payload) => {
  const result = registerUserSchema.validate(payload, {
    abortEarly: false
  })

  if (result.error) {
    throw new ResponseError(400, result.error.message)
  } else {
    return result.value
  }
}

export { validate }
