import {
  ILoadSurveyResultRepository,
  ISaveSurveyResultRepository,
} from '@data/interfaces/db';
import { ISaveSurveyResult } from '@domain/usecases/SaveSurveyResult';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    public readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    public readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {
    this.saveSurveyResultRepository = saveSurveyResultRepository;
  }

  public async save(
    data: ISaveSurveyResult.Params,
  ): Promise<ISaveSurveyResult.Result> {
    await this.saveSurveyResultRepository.save(data);
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(
      data.surveyId,
      data.accountId,
    );
    return surveyResult;
  }
}
