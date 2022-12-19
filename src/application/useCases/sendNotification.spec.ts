import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository'
import { SendNotification } from './sendNotification'

describe('Send Notification', () => {
  it('should be able to send a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const sendNotification = new SendNotification(notificationsRepository)

    const { notification } = await sendNotification.execute({
      content: 'This is a notification',
      category: 'social',
      recipientId: 'example-recipient-id',
    })

    expect(notification).toBeTruthy()
    expect(notificationsRepository.notifications[0]).toBe(notification)
    expect(notificationsRepository.notifications).toHaveLength(1)
  })
})
