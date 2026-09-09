import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = performance.now();

    return next.handle().pipe(
      tap(() => {
        const end = performance.now();

        console.log(`Request took ${end - start}ms`);
      }),
    );
  }
}
