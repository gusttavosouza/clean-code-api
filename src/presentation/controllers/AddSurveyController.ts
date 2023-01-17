import {
  IController,
  HttpResponse,
  IValidation,
} from '@presentation/protocols';
import { BadRequest, ServerError, NoContent } from '@presentation/helpers';
import { IAddSurvey } from '@domain/usecases';

export class AddSurveyController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey,
  ) {}

  async handle(request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return BadRequest(error);
      }
      await this.addSurvey.add({
        ...request,
        date: new Date(),
      });
      return NoContent();
    } catch (error) {
      return ServerError(error);
    }
  }
}

export namespace AddSurveyController {
  export type Request = {
    question: string;
    answers: Answer[];
  };

  type Answer = {
    image?: string;
    answer: string;
  };
}
