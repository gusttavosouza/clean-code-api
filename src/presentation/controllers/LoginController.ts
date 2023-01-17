import {
  IController,
  HttpResponse,
  IValidation,
} from '@presentation/protocols';
import {
  BadRequest,
  ServerError,
  Unauthorized,
  Success,
} from '@presentation/helpers';
import { IAuthentication } from '@domain/usecases';

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return BadRequest(error);
      }
      const authenticationModel = await this.authentication.auth(request);
      if (!authenticationModel) {
        return Unauthorized();
      }
      return Success(authenticationModel);
    } catch (error) {
      return ServerError(error);
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string;
    password: string;
  };
}
