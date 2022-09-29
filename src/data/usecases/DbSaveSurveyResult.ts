import {
  ILoadSurveyResultRepository,
  ISaveSurveyResultRepository,
} from '@data/interfaces/db';
import { SurveyResultModel } from '@domain/models/SurveyResult';
import {
  ISaveSurveyResult,
  SaveSurveyResultParams,
} from '@domain/usecases/SurveyResult/SaveSurveyResult';

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
      data.accountId,
    );
    return surveyResult;
  }
}
