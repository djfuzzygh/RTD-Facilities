import { getRepository } from 'typeorm'
import { Request } from '../models/Request'
import { NotificationService } from './notificationService'

export class RequestService {
  private repository = getRepository(Request)
  private notificationService = new NotificationService()

  async create(data: Partial<Request>): Promise<Request> {
    const request = this.repository.create(data)
    await this.repository.save(request)
    
    // Send notification
    await this.notificationService.sendRequestCreatedNotification(request)
    
    return request
  }

  async getAll(filters: any = {}): Promise<Request[]> {
    return this.repository.find({
      where: filters,
      order: {
        createdAt: 'DESC'
      }
    })
  }

  async update(id: string, data: Partial<Request>): Promise<Request> {
    await this.repository.update(id, data)
    const updated = await this.repository.findOne(id)
    
    if (!updated) {
      throw new Error('Request not found')
    }

    // Send notification if status changed
    if (data.status) {
      await this.notificationService.sendStatusChangeNotification(updated)
    }

    return updated
  }
} 