import { BadRequest, InternalError } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
  IAddSurvey,
} from './AddSurveyControllerProtocols';

export class AddSurveyController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey,
  ) {
    this.validation = validation;
    this.addSurvey = addSurvey;
  }

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return BadRequest(error);
      }
      const { question, answers } = httpRequest.body;
      await this.addSurvey.add({ question, answers });

      return null;
    } catch (error) {
      return InternalError(error);
    }
  }
}
