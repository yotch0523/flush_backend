import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Request,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable, map } from 'rxjs'
import { UserService } from '~/user/user.service'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const objectId = request.headers['x-user-id'] as string
    const user = await this.userService.findOne(objectId)

    return next.handle().pipe(
      map(() => {
        if (!user) throw new UnauthorizedException()
        return
      }),
    )
  }
}
