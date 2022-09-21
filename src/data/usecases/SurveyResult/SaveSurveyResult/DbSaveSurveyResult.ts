import {
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
  ISaveSurveyResult,
  SurveyResultModel,
  SaveSurveyResultParams,
} from './DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    public readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    public readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {
    this.saveSurveyResultRepository = saveSurveyResultRepository;
  }

  public async save(data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
    );
    return surveyResult;
  }
}
