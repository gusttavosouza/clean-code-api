import { BadRequest } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from './AddSurveyControllerProtocols';

export class AddSurveyController implements IController {
  constructor(private readonly validation: IValidation) {
    this.validation = validation;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body);
    if (error) {
      return BadRequest(error);
    }

    return new Promise(resolve => resolve(null));
  }
}
