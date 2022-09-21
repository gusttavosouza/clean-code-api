import { ILoadSurveyByIdRepository } from '@data/interfaces/db/Survey/ILoadSurveyByIdRepository';
import {
  ILoadSurveyResult,
  ILoadSurveyResultRepository,
  SurveyResultModel,
} from './DBLoadSurveyResultProtocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {
    this.loadSurveyResultRepository = loadSurveyResultRepository;
  }

  public async load(surveyId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
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
        })),
      };
    }

    return surveyResult;
  }
}
