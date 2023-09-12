import Joi from 'joi'

const registerUserSchema = Joi.object({
  username: Joi.string().max(30).required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().max(60).required(),
  country: Joi.string()
})

export {
  registerUserSchema
}
