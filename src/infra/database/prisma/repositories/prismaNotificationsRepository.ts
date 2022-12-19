import { Notification } from '@application/entities/notification/notification'
import { NotificationsRepository } from '@application/repositories/noficiationsRepository'
import { Injectable } from '@nestjs/common'
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper'
import { PrismaService } from '../prisma.service'

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  findById(notificationId: string): Promise<Notification | null> {
    throw new Error('Method not implemented.')
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)

    await this.prismaService.notification.create({ data: raw })
  }

  save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
