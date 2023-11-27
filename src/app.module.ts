import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { CardModule } from '~/card/card.module'
import { TelemetryClientProvider } from '~/providers/TelemetryClient.provider'
import { CosmosClientProvider } from '~/providers/cosmosClient.provider'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RequestModule } from './interceptor/request/request.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [ConfigModule.forRoot(), CardModule, RequestModule, UserModule],
  controllers: [AppController],
  providers: [AppService, CosmosClientProvider, TelemetryClientProvider],
  exports: [CosmosClientProvider, TelemetryClientProvider],
})
export class AppModule {}
