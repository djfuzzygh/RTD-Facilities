import { RequestService } from '../requestService'
import { createConnection, getRepository } from 'typeorm'
import { Request } from '../../models/Request'

describe('RequestService', () => {
  let requestService: RequestService

  beforeAll(async () => {
    await createConnection({
      type: 'sqlite',
      database: ':memory:',
      entities: [Request],
      synchronize: true,
    })
    requestService = new RequestService()
  })

  beforeEach(async () => {
    const repository = getRepository(Request)
    await repository.clear()
  })

  it('creates a new request', async () => {
    const request = await requestService.create({
      category: 'Vehicle',
      description: 'Test request',
      priority: 'Medium',
      contactPerson: 'John Doe',
      createdBy: 'user-1',
    })

    expect(request.id).toBeDefined()
    expect(request.status).toBe('pending')
  })

  it('updates request status', async () => {
    const request = await requestService.create({
      category: 'Vehicle',
      description: 'Test request',
      priority: 'Medium',
      contactPerson: 'John Doe',
      createdBy: 'user-1',
    })

    const updated = await requestService.update(request.id, {
      status: 'approved',
    })

    expect(updated.status).toBe('approved')
  })
}) 