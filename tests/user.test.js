/* eslint-disable no-undef */
import { web } from '../src/application/web.js'
import { logger } from '../src/application/logging.js'
import { prismaClient } from '../src/application/database.js'
import supertest from 'supertest'

describe('POST /users', function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: 'test'
      }
    })
  })

  it('should can register new user', async () => {
    const result = await supertest(web)
      .post('/users')
      .send({
        username: 'test',
        password: 'secretPassword',
        name: 'test',
        country: 'test'
      })

    expect(result.statusCode).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('test')
    expect(result.body.data.country).toBe('test')
    expect(result.body.data.password).toBeUndefined()
  })

  it('should reject if request is invalid', async () => {
    const result = await supertest(web)
      .post('/users')
      .send({
        username: '',
        password: '',
        name: '',
        country: 1
      })

    logger.info(result.body)

    expect(result.statusCode).toBe(400)
    expect(result.body.errors).toBeDefined()
  })

  it('should reject if username already registered', async () => {
    let result = await supertest(web)
      .post('/users')
      .send({
        username: 'test',
        password: 'secretPassword',
        name: 'test',
        country: 'test'
      })

    logger.info(result.body)

    expect(result.statusCode).toBe(200)
    expect(result.body.data.username).toBe('test')
    expect(result.body.data.name).toBe('test')
    expect(result.body.data.country).toBe('test')
    expect(result.body.data.password).toBeUndefined()

    result = await supertest(web)
      .post('/users')
      .send({
        username: 'test',
        password: 'secretPassword',
        name: 'test',
        country: 'test'
      })

    logger.info(result.body)

    expect(result.statusCode).toBe(400)
    expect(result.body.errors).toBeDefined()
  })
})
