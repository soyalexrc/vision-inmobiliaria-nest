import { ExecutionContext, HttpException, Inject, Injectable, NestMiddleware, RequestMethod } from '@nestjs/common';
import { Error as ErrorEntity } from '../error/entities/error.entity';
import { Transaction } from 'sequelize';
@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  constructor(@Inject(ErrorEntity) private readonly errorModel: typeof ErrorEntity) {}
  async use(context: ExecutionContext, next: () => Promise<any>) {
    try {
      return await next();
    } catch (error) {
      const description = error.message;
      const moduleFrom = context.getClass().name;
      const action = context.getHandler().name;
      const type = error.constructor.name;
      const method = context.switchToHttp().getRequest().method as RequestMethod; // Get HTTP method

      // Log error to console (optional for debugging)
      console.error(error);

      await this.errorModel.sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE }, async (transaction) => {
        try {
          const errorRecord = await this.errorModel.create(
            {
              description,
              moduleFrom,
              action,
              type,
              method, // HTTP method
            },
            { transaction },
          );
          console.log('Error logged to database:', errorRecord);
          await transaction.commit();
        } catch (transactionError) {
          console.error('Error logging to database:', transactionError);
          await transaction.rollback();
          throw new HttpException('Internal server error', 500); // Handle logging failure graceful
        }
      });
    }
  }
}
