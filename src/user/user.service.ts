import { Inject, Injectable } from '@nestjs/common'
import { ConstantToken } from '~/user/user.di.constants'
import { IUserDto } from './core/dto/user.dto'
import { IUserRepository } from './core/entity/user.repository.interface'

@Injectable()
export class UserService {
  constructor(
    @Inject(ConstantToken.REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne(objectId: string): Promise<IUserDto> {
    const entity = await this.userRepository.findOne(objectId)
    return {
      id: entity.id,
      objectId: entity.objectId,
      firstName: entity.firstName,
      lastName: entity.lastName,
    }
  }
}
