import { makeNotification } from '@test/factories/notificationFactory'
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository'
import { CountRecipientNotification } from './countRecipientNotifications'

describe('Count recipients Notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const countRecipientNotification = new CountRecipientNotification(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-id' }))
    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-id' }))
    await notificationsRepository.create(makeNotification({ recipientId: 'different-recipient' }))

    const { count } = await countRecipientNotification.execute({
      recipientId: 'example-recipient-id',
    })

    expect(count).toEqual(2)
  })
})
