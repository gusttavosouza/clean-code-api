import { IAuthentication } from '@domain/usecases';
import {
  BadRequest,
  InternalError,
  Success,
  Unauthorized,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpResponse,
  IValidation,
} from '@presentation/interfaces';

type LoginControllerParams = {
  email: string;
  password: string;
};

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {
    this.authentication = authentication;
    this.validation = validation;
  }

  public async handle(request: LoginControllerParams): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return BadRequest(error);
      }

      const { email, password } = request;

      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      if (!authenticationModel) {
        return Unauthorized();
      }

      return Success(authenticationModel);
    } catch (error) {
      return InternalError(error);
    }
  }
}
