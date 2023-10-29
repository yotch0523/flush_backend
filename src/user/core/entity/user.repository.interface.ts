import { User } from '~/user/core/entity/user.entity'

export interface IUserRepository {
  findOne(ojectId: string): Promise<User>
}
