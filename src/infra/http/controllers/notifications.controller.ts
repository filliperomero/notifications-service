import { SendNotification } from '@application/useCases/sendNotification'
import { Body, Controller, Post } from '@nestjs/common'
import { CreateNotificationBody } from '../dtos/createNotificationBody'

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    })

    return { notification }
  }
}
