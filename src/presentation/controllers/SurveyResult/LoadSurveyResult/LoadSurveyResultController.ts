import { InvalidParamError } from '@presentation/errors';
import { Forbidden, InternalError } from '@presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById,
} from './LoadSurveyResultControllerProtocols';

export class LoadSurveyResultController implements IController {
  constructor(private readonly loadSurveyByIdStub: ILoadSurveyById) {}

  public async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyByIdStub.loadById(surveyId);
      if (!survey) {
        return Forbidden(new InvalidParamError('surveyId'));
      }
      return null;
    } catch (error) {
      return InternalError(new Error());
    }
  }
}
