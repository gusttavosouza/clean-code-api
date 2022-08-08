import {
  ISaveSurveyResultRepository,
  SaveSurveyResultModel,
  SurveyResultModel,
} from './DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements ISaveSurveyResultRepository {
  constructor(
    public readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
  ) {
    this.saveSurveyResultRepository = saveSurveyResultRepository;
  }

  public async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data);
    return null;
  }
}
