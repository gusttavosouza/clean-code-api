import { ILoadAnswersBySurvey } from '@domain/usecases';
import { ILoadAnswersBySurveyRepository } from '@data/protocols';

export class DbLoadAnswersBySurvey implements ILoadAnswersBySurvey {
  constructor(
    private readonly loadAnswersBySurveyRepository: ILoadAnswersBySurveyRepository,
  ) {}

  async loadAnswers(id: string): Promise<LoadAnswersBySurvey.Result> {
    return this.loadAnswersBySurveyRepository.loadAnswers(id);
  }
}
