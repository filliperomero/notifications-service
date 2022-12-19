import { Content } from '@application/entities/notification/content'
import { Notification } from '@application/entities/notification/notification'
import { Notification as RawNotification } from '@prisma/client'

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      updatedAt: notification.updatedAt,
    }
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        canceledAt: raw.canceledAt,
        readAt: raw.readAt,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    )
  }
}
