import {
  ILoadSurveyByIdRepository,
  ILoadSurveyResultRepository,
} from '@data/interfaces/db';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import { ILoadSurveyResult } from '@domain/usecases/LoadSurveyResult';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {
    this.loadSurveyResultRepository = loadSurveyResultRepository;
  }

  public async load(
    surveyId: string,
    accountId: string,
  ): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
      accountId,
    );

    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId);
      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => ({
          ...answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false,
        })),
      };
    }

    return surveyResult;
  }
}
