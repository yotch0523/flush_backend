import { Container, CosmosClient, Database } from '@azure/cosmos'
import { Inject, Injectable } from '@nestjs/common'
import { User } from '~/user/core/entity/user.entity'
import { IUserRepository } from '~/user/core/entity/user.repository.interface'

const containerName = 'users'

@Injectable()
export class UserRepository implements IUserRepository {
  private database: Database
  private container: Container
  constructor(@Inject('CosmosClient') private readonly client: CosmosClient) {
    this.database = this.client.database(process.env.COSMOS_DB_NAME || '')
    this.container = this.database.container(containerName)
  }

  async findOne(partitionKey: string): Promise<User> {
    const { resources } = await this.container.items
      .query<User>({
        query: 'select * from c where c.objectId=@objectId offset 0 limit 1',
        parameters: [
          {
            name: '@objectId',
            value: partitionKey,
          },
        ],
      })
      .fetchAll()
    return resources[0]
  }
}
