import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Error as ErrorEntity } from "../error/entities/error.entity";

@Injectable()
export class ErrorService{
  constructor(
    @InjectModel(ErrorEntity) private errorModel: typeof ErrorEntity,
  ) {
  }
}
