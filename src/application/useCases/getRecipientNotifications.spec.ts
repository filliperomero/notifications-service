import { makeNotification } from '@test/factories/notificationFactory'
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationsRepository'
import { GetRecipientNotification } from './getRecipientNotifications'

describe('Get recipients Notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository()
    const getRecipientNotification = new GetRecipientNotification(notificationsRepository)

    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-id' }))
    await notificationsRepository.create(makeNotification({ recipientId: 'example-recipient-id' }))
    await notificationsRepository.create(makeNotification({ recipientId: 'different-recipient' }))

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'example-recipient-id',
    })

    expect(notifications).toHaveLength(2)
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
        expect.objectContaining({ recipientId: 'example-recipient-id' }),
      ])
    )
  })
})
