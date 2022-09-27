import {
  BadRequest,
  InternalError,
  Success,
  Unauthorized,
} from '@presentation/helpers/http';
import {
  IValidation,
  IController,
  IHttpRequest,
  IHttpResponse,
  IAuthentication,
} from './LoginControllerProtocols';

export class LoginController implements IController {
  constructor(
    private readonly authentication: IAuthentication,
    private readonly validation: IValidation,
  ) {
    this.authentication = authentication;
    this.validation = validation;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return BadRequest(error);
      }

      const { email, password } = httpRequest.body;

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
