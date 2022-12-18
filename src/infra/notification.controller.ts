import { Body, Controller, Get, Post } from '@nestjs/common'
import { PrismaService } from './database/prisma/prisma.service'
import { randomUUID } from 'node:crypto'
import { CreateNotificationBody } from './create-notification-body'

@Controller('notifications')
export class NotificationController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  getNotifications() {
    return this.prisma.notification.findMany()
  }

  @Post()
  async createNotification(@Body() body: CreateNotificationBody) {
    const { content, category, recipientId } = body

    await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content,
        category,
        recipientId,
      },
    })
  }
}
