import * as express from 'express';
import {Middleware, ExpressErrorMiddlewareInterface, HttpError} from 'routing-controllers';


@Middleware({type: 'after'})
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  public error(error: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
    res.status(error.httpCode | 400).json({
      name: error.name,
      message: error.message
    });
    console.error(`ErrorHandler:\nError=[${error.name}]\nMessage=[${error.message}]`);
  }
}