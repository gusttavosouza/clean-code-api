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
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
    );

    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }

    return surveyResult;
  }
}
