import { IAddSurvey } from '@domain/usecases';
import {
  BadRequest,
  InternalError,
  NoContent,
} from '@presentation/helpers/http';
import {
  IController,
  IHttpResponse,
  IValidation,
} from '@presentation/interfaces';

type Answer = {
  image?: string;
  answer: string;
};

type AddSurveyParams = {
  question: string;
  answers: Answer[];
};

export class AddSurveyController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey,
  ) {
    this.validation = validation;
    this.addSurvey = addSurvey;
  }

  public async handle(request: AddSurveyParams): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return BadRequest(error);
      }
      const { question, answers } = request;
      await this.addSurvey.add({ question, answers, date: new Date() });

      return NoContent();
    } catch (error) {
      return InternalError(error);
    }
  }
}
