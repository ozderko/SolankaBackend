import 'reflect-metadata';
import {createConnection, useContainer as ormUseContainer} from 'typeorm';
import {createExpressServer, useContainer as routerUseContainer} from 'routing-controllers';
import {Container} from "typedi";
import {config} from "./config";
import {Product} from "./models/Product";
import {ProductController} from "./controllers/ProductController";
import {ComponentController} from './controllers/ComponentController';
import {DishController} from './controllers/DishController';
import {ErrorHandlerMiddleware} from './middlewares/ErrorHandlerMiddleware';

//TypeDI
ormUseContainer(Container);
routerUseContainer(Container);

//TypeORM
createConnection({
  type: 'mysql',
  host: config.orm_host,
  port: config.orm_port,
  username: config.orm_username,
  password: config.orm_password,
  database: config.orm_database,
  synchronize: config.orm_synchronize,
  logging: config.orm_logging,
  entities: [
    "dist/models/**/*.js"
  ],
  migrations: [
    "dist/migration/**/*.js"
  ],
  subscribers: [
    "dist/subscriber/**/*.js"
  ],
  cli: {
    "entitiesDir": "dist/models",
    "migrationsDir": "dist/migration",
    "subscribersDir": "dist/subscriber"
  },
  dropSchema: false
}).then(connection => console.log(`Connected to db on port=[${config.orm_port}]`))
  .catch(error => console.error(`Can't connect to db on port=[${config.orm_port}]. Error: ${error.message}`));

//Express
createExpressServer({
  cors: true,
  controllers: [ProductController, ComponentController, DishController],
  middlewares: [ErrorHandlerMiddleware],
  defaultErrorHandler: false
}).listen(config.app_port);

console.log(`App started on port=[${config.app_port}]!`);