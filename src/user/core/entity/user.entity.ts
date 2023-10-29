import { IUserDto } from '~/user/core/dto/user.dto'

export class User {
  id: string
  objectId: string
  firstName?: string
  lastName?: string

  constructor(dto: IUserDto) {
    this.id = dto.id
    this.objectId = dto.objectId
    this.firstName = dto.firstName
    this.lastName = dto.lastName
  }
}
