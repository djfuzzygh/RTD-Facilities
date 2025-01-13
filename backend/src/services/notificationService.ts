import { DefaultAzureCredential } from '@azure/identity'
import { WebPubSubServiceClient } from '@azure/web-pubsub'
import { Request } from '../models/Request'

export class NotificationService {
  private pubSubClient: WebPubSubServiceClient

  constructor() {
    const credential = new DefaultAzureCredential()
    this.pubSubClient = new WebPubSubServiceClient(
      process.env.PUBSUB_CONNECTION_STRING || '',
      'facilities'
    )
  }

  async sendRequestCreatedNotification(request: Request): Promise<void> {
    await this.pubSubClient.sendToAll({
      type: 'requestCreated',
      data: {
        id: request.id,
        category: request.category,
        description: request.description,
        priority: request.priority,
        status: request.status
      }
    })
  }

  async sendStatusChangeNotification(request: Request): Promise<void> {
    await this.pubSubClient.sendToAll({
      type: 'statusChanged',
      data: {
        id: request.id,
        status: request.status,
        updatedAt: request.updatedAt
      }
    })
  }

  async sendUserNotification(userId: string, message: string): Promise<void> {
    await this.pubSubClient.sendToUser(userId, {
      type: 'notification',
      data: {
        message,
        timestamp: new Date()
      }
    })
  }
} 