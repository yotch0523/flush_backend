import { forwardRef, Module } from '@nestjs/common'
import { AppModule } from '~/app.module'
import { ConstantToken } from '~/user/user.di.constants'
import { UserRepository } from './core/infra/user.repository.cosmosdb'
import { UserService } from './user.service'

@Module({
  imports: [forwardRef(() => AppModule)],
  providers: [
    UserService,
    {
      provide: ConstantToken.REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
