import { CancelNotification } from '@application/useCases/cancelNotification'
import { CountRecipientNotifications } from '@application/useCases/countRecipientNotifications'
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotifications'
import { ReadNotification } from '@application/useCases/readNotification'
import { SendNotification } from '@application/useCases/sendNotification'
import { UnreadNotification } from '@application/useCases/unreadNotification'
import { Body, Controller, Param, Patch, Post } from '@nestjs/common'
import { Get } from '@nestjs/common/decorators'
import { CreateNotificationBody } from '../dtos/createNotificationBody'
import { NotificationViewModel } from '../viewModels/notificationViewModel'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNofications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNofications.execute({ recipientId })

    return { count }
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({ recipientId })

    return { notifications: notifications.map(NotificationViewModel.toHTTP) }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id })
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id })
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    return { notification: NotificationViewModel.toHTTP(notification) }
  }
}
