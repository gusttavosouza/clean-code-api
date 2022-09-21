import {
  ILoadSurveyResult,
  ILoadSurveyResultRepository,
  SurveyResultModel,
} from './DBLoadSurveyResultProtocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {
    this.loadSurveyResultRepository = loadSurveyResultRepository;
  }

  public async load(surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      surveyId,
    );

    return surveyResult;
  }
}
