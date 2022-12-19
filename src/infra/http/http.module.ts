import { SendNotification } from '@application/useCases/sendNotification'
import { DatabaseModule } from '@infra/database/database.module'
import { Module } from '@nestjs/common'
import { NotificationsController } from './controllers/notifications.controller'

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
