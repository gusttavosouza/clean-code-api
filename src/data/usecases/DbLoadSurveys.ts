import { ILoadSurveysRepository } from '@data/interfaces/db';
import { SurveyModel } from '@domain/models/Survey';
import { ILoadSurveys } from '@domain/usecases/Survey/LoadSurveys';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveysRepository) {
    this.loadSurveysRepository = loadSurveysRepository;
  }

  public async load(accountId: string): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId);
    return surveys;
  }
}
