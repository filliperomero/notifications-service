import { Injectable } from '@nestjs/common'
import { Content } from '../entities/notification/content'
import { Notification } from '../entities/notification/notification'
import { NotificationsRepository } from '../repositories/noficiationsRepository'

interface SendNotificationRequest {
  recipientId: string
  content: string
  category: string
}

interface SendNotificationResponse {
  notification: Notification
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
    const { recipientId, category, content } = request

    const notification = new Notification({ recipientId, category, content: new Content(content) })

    // Persist nofication in db
    await this.notificationsRepository.create(notification)

    return { notification }
  }
}
