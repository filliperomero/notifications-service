import { Module } from '@nestjs/common'
import { NotificationController } from './infra/notification.controller'
import { AppService } from './app.service'
import { PrismaService } from './infra/database/prisma/prisma.service'

@Module({
  imports: [],
  controllers: [NotificationController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
