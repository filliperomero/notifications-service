import { Notification } from 'src/application/entities/notification/notification'
import { NotificationsRepository } from 'src/application/repositories/noficiationsRepository'

export class InMemoryNotificationsRepository implements NotificationsRepository {
  public notifications: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    return this.notifications.find(notification => notification.id === notificationId) ?? null
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(notification => notification.recipientId === recipientId)
      .length
  }

  async create(notification: Notification) {
    this.notifications.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      notification => notification.id === notification.id
    )

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification
    }
  }
}
