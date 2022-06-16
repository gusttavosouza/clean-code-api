import {
  IValidation,
  IController,
  IHttpRequest,
  IHttpResponse,
  IAuthentication,
} from './LoginControllerProtocols';
import {
  BadRequest,
  InternalError,
  Success,
  Unauthorized,
} from '../../helpers';

export class LoginController implements IController {
  private readonly authentication: IAuthentication;
  private readonly validation: IValidation;

  constructor(authentication: IAuthentication, validation: IValidation) {
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

      const accessToken = await this.authentication.auth(email, password);
      if (!accessToken) {
        return Unauthorized();
      }

      return Success({ accessToken });
    } catch (error) {
      return InternalError(error);
    }
  }
}
