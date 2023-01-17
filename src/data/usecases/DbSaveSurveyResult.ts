import { ISaveSurveyResult } from '@domain/usecases';
import {
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
} from '@data/protocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {}

  async save(data: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data);
    return this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId,
    );
  }
}
