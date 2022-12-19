// Normally we use an interface for that but since we're using Nest, it works better with abstract classes

import { Notification } from '../entities/notification/notification'

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>
  abstract findById(notificationId: string): Promise<Notification | null>
  abstract save(notification: Notification): Promise<void>
}
