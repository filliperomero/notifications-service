import { Content } from '@application/entities/notification/content'
import { Notification } from '@application/entities/notification/notification'
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository'
import { CancelNotification } from './cancelNotification'
import { NotificationNotFound } from './errors/notificationNotFound'

describe('Cancel Notification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    const notification = new Notification({
      category: 'social',
      content: new Content('New notification'),
      recipientId: 'example-recipient-id',
    })

    await notificationsRepository.create(notification)

    await cancelNotification.execute({ notificationId: notification.id })

    expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
  })

  it('should not be able to cancel a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const cancelNotification = new CancelNotification(notificationsRepository)

    expect(() => {
      return cancelNotification.execute({ notificationId: 'fake-notification-id' })
    }).rejects.toThrow(NotificationNotFound)
  })
})
